import DB from './index';
import { Annontation } from '../types/databaseTypes';
import getAnnontations from './queries/getAnnontations';

export default async (id: string): Promise<Annontation> => {
  const query =  getAnnontations(id);
  const response = await DB.query(query, { transform: 'toJSON' });
  return response.records;
};