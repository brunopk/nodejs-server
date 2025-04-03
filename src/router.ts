import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import getDataFromDB from './handlers';

const app = express();

const asyncHandler = (func: RequestHandler) => (req: Request, res:Response, next: NextFunction) => {
  Promise.resolve(func(req, res, next))
    .catch(next)
}

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.get('/db', asyncHandler(getDataFromDB));

export default app;
