import express from 'express';
import fileDb from '../fileDb';
import { ClientMessage } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  const messageData: ClientMessage = {
    author: req.body.author,
    message: req.body.message,
  };
  await fileDb.addItem(messageData);
  return res.send('OK');
});

export default messagesRouter;
