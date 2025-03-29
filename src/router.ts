import express from 'express';
import getDataFromDB from './handlers';

const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.get('/db', getDataFromDB);

export default app;
