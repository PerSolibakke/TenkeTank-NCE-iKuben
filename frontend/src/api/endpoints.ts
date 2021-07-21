import {Node, Triplet, Annotation} from '../types/databaseTypes';
import api from './api';

export const getAnnontations = async (nodeId: string): Promise<Array<Annotation>> => {
  try {
    const data: Array<Annotation> = await api.GET(
      `ontologies/annontations/${encodeURIComponent(nodeId)}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return [{ label: '', description: '', moreInformation: '', title: '', icon: '' , citation: ''}];
  }
};

export const getTriplets = async (nodeId: string): Promise<Array<Triplet>> => {
  try {
    const data: Array<Triplet> = await api.GET(
      `ontologies/triplets/${encodeURIComponent(nodeId)}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getInitalNode = async (): Promise<Array<Node>> => {
  try {
    const data: Array<Node> = await api.GET(`ontologies/initalNode`);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

