import { Center, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setError } from '../../state/reducers/apiErrorReducer';
import { selectNode } from '../../state/reducers/databaseReducer';
import { TenkeTank } from '../../types/databaseTypes';
import { mapTenkeTankToNode } from '../../common/node';
import IconContainer from '../atoms/IconContainer';



const Tenketank: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let tenkeTank = {
    iri: 'http://www.semanticweb.org/per.solibakke/ontologies/2021/6/TT#TenkeTank',
    name: 'Tenketank for young leaders',
    icon: 'https://media-exp3.licdn.com/dms/image/C4D0BAQEaprrYMTGprg/company-logo_200_200/0/1519886740516?e=2159024400&v=beta&t=M3flLOivZXWl7dKR5tp_RZMgooNAnuA2uw-E8uNlQNQ',
  };

  const onClickMF = (tt: TenkeTank) => {
    const node = mapTenkeTankToNode(tt);
    if (!node) {
      dispatch(setError(new Error('Could not map TenkeTank to node')));
      return;
    }

   dispatch(selectNode(node));
  };


  return (
    <Box align="center" h="15vh">

          <IconContainer
            key={tenkeTank.iri}
            onClick={() => {
              onClickMF(tenkeTank);
              window.scrollTo(0, 0);
              history.push('/graphpage');
            }}
            tenkeTankNode={tenkeTank}
          />
        
  </Box>
);
};
export default Tenketank;
