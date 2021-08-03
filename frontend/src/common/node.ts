import {
  Edge,
  Node,
  Prefix,
  TenkeTank,
} from '../types/databaseTypes';

export const mapPrefixNameToNode = (
  prefix: string,
  name: string,
  type?: string,
): Node => ({
  prefix: {
    prefix,
    iri: `http://www.semanticweb.org/persolibakke/ontologies/2021/6/${prefix}#`,
  },
  name,
  id: `http://www.semanticweb.org/persolibakke/ontologies/2021/6/${prefix}#${name}`,
  type: type || 'undefined',
});

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

export const mapIdToNode = (id: string , type?: string): Node | null => {
  const prefix = parsePrefixFromClassId(id);
  const name = parseNameFromClassId(id);
  if (!prefix || !name) return null;
  return {
    prefix,
    name,
    id,
    type: type || 'undefined',
  };
};

export const mapTenkeTankToNode = (tt: TenkeTank): Node | null => {
  const node = mapIdToNode(tt.iri);
  if (!node) return null;
  node.name = tt.name;
  return node;
};

export const mapIdToEdge = (id: string): Edge | null => {
  const prefix = parsePrefixFromClassId(id);
  const name = parseNameFromClassId(id);
  if (!prefix || !name) return null;
  return {
    prefix,
    name,
    id,
  };
};





