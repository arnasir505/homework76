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
  async getItems() {
    return data;
  },
  async addItem(item: ClientMessage) {
    const date = new Date().toISOString();
    const product: Message = {
      id: crypto.randomUUID(),
      datetime: date,
      ...item,
    };
    data.push(product);
    await this.save();

    return product;
  },
  async clearMessages() {
    data = [];
    await this.save();
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;
