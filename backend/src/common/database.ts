import { Prefix } from '@innotrade/enapso-graphdb-client';
import { Node, Entity, Record, Triplet, Edge } from '../types/databaseTypes';


export const parseNameFromClassId = (id: string): string => {
  const regex = /^[^_]*#/;
  const name = id.replace(regex, ''); 
  if (!name || name === id) return '';
  return name;
};

export const parsePrefixFromClassId = (id: string): Prefix | null => {
  const prefixRegex = /(?<=\/)([^/]*)(?=#)/;
  const prefixMatches = id.match(prefixRegex);
  if (!prefixMatches || !prefixMatches[0]) return null;

  const iriRegex = /^[^_]*#/;
  const iriMatches = id.match(iriRegex);
  if (!iriMatches || !iriMatches[0]) return null;

  return {
    prefix: prefixMatches[0],
    iri: iriMatches[0],
  };
};

export const mapIdToEntity = (id: string): Entity | null => {
  const prefix = parsePrefixFromClassId(id);
  const name = parseNameFromClassId(id);
  if (!prefix || !name) return null;
  return {
    prefix,
    name,
    id,
  };
};

export const mapIdToNode = (id: string, type?: string): Node | null => {
  const ontologyEntity = mapIdToEntity(id);
  if (!ontologyEntity) return null;
  return {
    prefix: ontologyEntity.prefix,
    name: ontologyEntity.name,
    id: ontologyEntity.id,
    type: type || 'undefined',
  };
};

export const mapIdToEdge = (id: string): Edge | null => {
  const entity = mapIdToEntity(id);
  if (!entity) return null;
  return {
    prefix: entity.prefix,
    name: entity.name,
    id: entity.id,
  };
};

export const mapRecordToTriplet = (record: Record): Triplet => {
  let subject = record.Subject ? mapIdToNode(record.Subject) : null;
  if (subject && record.SubjectLabel) {
    if (record.TypeLabel)
      subject = { ...subject, name: record.SubjectLabel, type: record.TypeLabel };
    subject = { ...subject, name: record.SubjectLabel };
  }
  let object = record.Object ? mapIdToNode(record.Object) : null;
  if (object && record.ObjectLabel) {
    if (record.TypeLabel) object = { ...object, name: record.ObjectLabel, type: record.TypeLabel };
    object = { ...object, name: record.ObjectLabel };
  }
  return {
    Subject: subject,
    Object: object,
    Predicate: mapIdToEdge(record.Predicate),
  };
};

export const mapRecordToObject = (record: Record): Node | null => {
  let object = record.Object ? mapIdToNode(record.Object) : null;
  if (object && record.ObjectLabel) {
    object = { ...object, name: record.ObjectLabel };
  }
  return object;
};

export const mapRecordToSubject = (record: Record): Node | null => {
  let subject = record.Subject ? mapIdToNode(record.Subject) : null;
  if (subject && record.SubjectLabel) {
    subject = { ...subject, name: record.SubjectLabel };
  }
  return subject;
};

export const parseEntityToQuery = (entity: Entity): string =>
  `${entity.prefix.prefix}:${entity.name}`;

export const parsePrefixesToQuery = (...prefixes: Prefix[]): string => {
  const strings = prefixes.map((p) => `PREFIX ${p.prefix}: <${p.iri}>`);
  return strings.join('\n');
};

export const addEntityToNullFields = (triplet: Triplet, entity: Node): Triplet => ({
  Subject: triplet.Subject || entity,
  Predicate: triplet.Predicate,
  Object: triplet.Object || entity,
});

export const filterDuplicatePredicates = (
  triplet: Triplet,
  _: number,
  others: Array<Triplet>,
): boolean => {
  const hasDuplicate = others.some(
    (ont) =>
      ont.Subject?.name === triplet.Subject?.name &&
      ont.Object?.name === triplet.Object?.name &&
      ont.Predicate?.name !== triplet.Predicate?.name,
  );
  if (!hasDuplicate) return true;
 return true;
};

export const isNotLoopTriplet = (triplet: Triplet): boolean =>
triplet.Subject !== triplet.Object;

export const isNotNull = <T>(obj: T): boolean => obj !== null && obj !== undefined;
