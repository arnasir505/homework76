import express from 'express';
import fileDb from '../fileDb';
import { ClientMessage } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);

  if (queryDate) {
    if (isNaN(date.getDate())) {
      return res.status(400).send({ error: 'Invalid date' });
    }
  }

  const messages = await fileDb.getItems(queryDate);
  return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (
    !req.body.author ||
    !req.body.message ||
    req.body.author === '' ||
    req.body.message === ''
  ) {
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

export default messagesRouter;
