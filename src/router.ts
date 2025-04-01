import express from 'express';
import 'express-async-errors';
import getDataFromDB from './handlers';

const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.get('/db', getDataFromDB);

export default app;
