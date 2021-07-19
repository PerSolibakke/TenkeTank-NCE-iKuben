import { Router } from 'express';
import getTriplets from '../database/getTriplets';
import getInitalNode from '../database/getInitalNode';
import onError from './middleware/onError';
import verifyDatabaseAccess from './middleware/verifyDatabaseAccess';
import {
    ClassIdRequest,
    EmptyRequest,
    NodeArrayResponse,
    OntologyArrayResponse,
  } from '../types/routerTypes';

const router = Router();

const getTripletsFromClass = async (req: ClassIdRequest, res: OntologyArrayResponse) => {
  try {
    const data = await getTriplets(req.params.classId);
    res.json(data);
  } catch (e) {
    onError(e, req, res);
  }
};

const getInitalNodeFromOntology = async (req: EmptyRequest, res: NodeArrayResponse) => {
  try {
    const data = await getInitalNode();
    res.json(data);
  } catch (e) {
    onError(e, req, res);
  }
};


router.get('/triplets/:classId', verifyDatabaseAccess, getTripletsFromClass);
router.get('/initalNode', verifyDatabaseAccess, getInitalNodeFromOntology);

export default router;