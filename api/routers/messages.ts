import express from 'express';
import fileDb from '../fileDb';
import { ClientMessage } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (req.body.author === '' || req.body.message === '') {
    return res
      .status(400)
      .send({ error: 'Author and message must be present in the request' });
  }
  const messageData: ClientMessage = {
    author: req.body.author,
    message: req.body.message,
  };
  await fileDb.addItem(messageData);
  return res.send('OK');
});

messagesRouter.get('/clear', async (_req, res) => {
  await fileDb.clearMessages();
  return res.send('Cleared messsages');
});

export default messagesRouter;
