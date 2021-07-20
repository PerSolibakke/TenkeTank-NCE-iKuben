import {
    mapIdToEntity,
    parseEntityToQuery,
    parsePrefixesToQuery,
  } from '../../common/database';
  import { PREFIXES } from '../index';
  
  export default (classId: string): string => {
    const node = mapIdToEntity(classId);
    if (!node) return '';
    const fullClassName = parseEntityToQuery(node);
    const prefixString = parsePrefixesToQuery(node.prefix, PREFIXES.RDFS);
  
    return `
    ${prefixString}
    SELECT *
    WHERE {
      {
       ${fullClassName}  ?Predicate ?Object . 
       Filter (?Predicate != rdf:type && ?Predicate != rdfs:subClassOf )
        OPTIONAL {?Object rdfs:label ?ObjectLabel}
        OPTIONAL { ?Object sesame:directType ?Type.
                       ?Type rdfs:label ?TypeLabel}
      }
      UNION {
          ${fullClassName}   ?Predicate ?Object . 
          OPTIONAL {?Object rdfs:label ?ObjectLabel}
        filter exists {
          ${fullClassName} sesame:directType ?Object  . 
        }
    }
    UNION {
      ${fullClassName}   ?Predicate ?Object . 
      Filter(?Predicate = rdfs:subClassOf)
      OPTIONAL {?Object rdfs:label ?ObjectLabel}
      FILTER NOT EXISTS { ?otherSub rdfs:subClassOf ?Object . 
        ${fullClassName}  rdfs:subClassOf ?otherSub .
                           FILTER (?otherSub != ${fullClassName} )
       }
  }
  UNION
  {
    ?Subject ?Predicate ${fullClassName} .
    Filter (?Predicate != rdf:type && ?Predicate != rdfs:subClassOf )
    OPTIONAL {?Subject rdfs:label ?SubjectLabel}
    OPTIONAL { ?Subject sesame:directType ?Type.
                    ?Type rdfs:label ?TypeLabel}
  }
  UNION {
    ?Subject ?Predicate  ${fullClassName} .
   filter exists {
        ?Subject  sesame:directType ${fullClassName} . 
   }
}
           UNION {
    ?Subject ?Predicate  ${fullClassName}.
   Filter(?Predicate = rdfs:subClassOf)
   OPTIONAL {?Subject rdfs:label ?SubjectLabel}
   FILTER NOT EXISTS { ?Subject rdfs:subClassOf ?otherSub . 
                         ?otherSub rdfs:subClassOf  ${fullClassName} .
                        FILTER (?otherSub !=  ${fullClassName})
    }
}
      Filter(?Object != owl:NamedIndividual && ?Object != owl:Class &&  ?Predicate != owl:topObjectProperty && ?Predicate != rdfs:label  && ?Predicate != rdfs:domain  && ?Predicate != rdfs:comment && ?Predicate != rdfs:range) .

    }`;
  };
  