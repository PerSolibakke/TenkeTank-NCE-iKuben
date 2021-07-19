import DB from './index';
import { Node } from '../types/databaseTypes';
import getInitalNode from './queries/getInitalNode';

export default async (): Promise<Array<Node>> => {
  const query =  getInitalNode();
  const response = await DB.query(query, { transform: 'toJSON' });
  return response.records;
};