import { Flex, Stack } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { D3Edge } from '../../types/d3/simulation';
import { GraphEdge, GraphNode } from '../../types/databaseTypes';
import Graph from '../atoms/Graph';

// component wrapping the Graph, Graphtoolbar and GraphDescriptions. Also creates nodeFilter and edgeFilter callbacks
const GraphContainer: React.FC = () => {
  const [unlockNodes, setUnlockNodes] = useState<boolean>(false);
  const [edgeLabelsVisible, setEdgeLabelsVisible] = useState<boolean>(true);



  return (
    <Stack
      spacing={ 0 }
      h={'100vh' }
      w={'100vw' }
      position={ 'absolute'}
    >

      <Flex h="100%" justify="space-between">
        <Graph
          unlockAllNodes={unlockNodes}
          edgeLabelsVisible={edgeLabelsVisible}
        />
      </Flex>
    </Stack>
  );
};

export default GraphContainer;
