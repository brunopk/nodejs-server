import { RequestHandler } from 'express';
import pool from './db-pool';
import loggerFactory from './logging';

const logger = loggerFactory('express');

const getDataFromDB: RequestHandler = async (_, resp) => {
  try {
    const [rows] = await pool.query('SELECT `field1`, `field2` FROM `table`');
    resp.json(rows);
  } catch (err) {
    logger.error('Error', err);
    resp.json(err);
    resp.status(500);
  }
};

export default getDataFromDB;
