import { promises as fs } from 'fs';
import { ClientMessage, Message } from './types';

const fileName = './db.json';

let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems(queryDate?: string) {
    if (!queryDate) {
      if (data.length < 30) {
        return data;
      }
      const last30Messages = data.slice(data.length - 30, data.length);
      return last30Messages;
    }
    const foundIndex = data.findIndex((msg) => msg.datetime === queryDate);
    if (foundIndex !== -1) {
      const lastMessagesAfterDate = data.slice(foundIndex + 1);
      return lastMessagesAfterDate;
    }
    return [];
  },
  async addItem(item: ClientMessage) {
    const date = new Date().toISOString();
    const product: Message = {
      id: crypto.randomUUID(),
      ...item,
      datetime: date,
    };
    data.push(product);
    await this.save();

    return product;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;
