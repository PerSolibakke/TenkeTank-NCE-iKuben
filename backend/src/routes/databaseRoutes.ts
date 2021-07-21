import { Router } from 'express';
import getTriplets from '../database/getTriplets';
import getInitalNode from '../database/getInitalNode';
import onError from './middleware/onError';
import verifyDatabaseAccess from './middleware/verifyDatabaseAccess';
import {
    IdRequest,
    EmptyRequest,
    NodeArrayResponse,
    AnnontationResponse,
    OntologyArrayResponse,
  } from '../types/routerTypes';
import getAnnontations from '../database/getAnnontations';

const router = Router();

const getTripletsFromClass = async (req: IdRequest, res: OntologyArrayResponse) => {
  try {
    const data = await getTriplets(req.params.id);
    res.json(data);
  } catch (e) {
    onError(e, req, res);
  }
};


const getAnnontationsFromClass = async (req: IdRequest, res: AnnontationResponse) => {
  try {
    const data = await getAnnontations(req.params.id);
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

router.get('/annontations/:id', verifyDatabaseAccess, getAnnontationsFromClass);
router.get('/triplets/:id', verifyDatabaseAccess, getTripletsFromClass);
router.get('/initalNode', verifyDatabaseAccess, getInitalNodeFromOntology);

export default router;