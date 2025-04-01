import { RequestHandler } from 'express';
import pool from './db-pool';

const getDataFromDB: RequestHandler = async (_, resp) => {
  const [rows] = await pool.query('SELECT `field1`, `field2` FROM `table`');
  resp.json(rows);
};

export default getDataFromDB;
