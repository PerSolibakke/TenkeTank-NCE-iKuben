import {
    addEntityToNullFields,
    filterDuplicatePredicates,
    isNotLoopTriplet,
    mapIdToNode,
    mapRecordToOntology,
  } from '../common/database';
  import { ApiError } from '../types/errorTypes';
  import { Triplet, Record } from '../types/databaseTypes';
  import DB from './index';
  import getRelations from './queries/getTriplets';
  
  const isRelevantOntology = (ontology: Triplet): boolean => {
    if (!ontology || !ontology.Predicate || !(ontology.Subject || ontology.Object)) return false;
    const node = ontology.Subject || ontology.Object;
    if (!node || node.id.includes('node')) return false;
    return true;
  };
  
  export default async (classId: string): Promise<Array<Triplet>> => {
    const node = mapIdToNode(classId);
    if (!node) {
      throw new ApiError(400, 'Could not parse node from the given class ID');
    }
    const query = getRelations(classId);
    const response = await DB.query(query, { transform: 'toJSON' });
    const records = response.records as Array<Record>;
    const ontologies = records
      .map(mapRecordToOntology)
      .map((ont) => addEntityToNullFields(ont, node))
      .filter(isRelevantOntology)
      .filter(isNotLoopTriplet)
    return ontologies;
  };
  