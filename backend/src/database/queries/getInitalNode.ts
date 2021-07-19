import { parsePrefixesToQuery } from '../../common/database';
import { PREFIXES } from '../index';

export default (): string => {
  const prefixString = parsePrefixesToQuery(PREFIXES.TT, PREFIXES.SCHEMA, PREFIXES.RDFS);

  return `
      ${prefixString}
      SELECT ?label
      WHERE { 
        MF:Per_Solibakke rdfs:label  ?label .
      }`;
};
