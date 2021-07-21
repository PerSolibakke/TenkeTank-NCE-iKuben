import {
    mapIdToEntity,
    parseEntityToQuery,
    parsePrefixesToQuery,
  } from '../../common/database';
  import { PREFIXES } from '../index';
  
  export default (id: string): string => {
    const node = mapIdToEntity(id);
    if (!node) return '';
    const fullClassName = parseEntityToQuery(node);
    const prefixString = parsePrefixesToQuery(PREFIXES.TT, PREFIXES.RDFS, PREFIXES.SCHEMA);
  
    return `
      ${prefixString}
      select *
      where { 
      { 
           ${fullClassName} rdfs:label ?label.
      Optional {
           ${fullClassName} TT:description ?description.
      }
      Optional {
           ${fullClassName} TT:title ?title.
      }
      Optional {
           ${fullClassName} schema:icon ?icon.
      }   
      Optional {
           ${fullClassName} TT:moreInformation ?moreInformation.
      }
      Optional {
          ${fullClassName} TT:citation ?citation.
     }
     }
     } `;
  };