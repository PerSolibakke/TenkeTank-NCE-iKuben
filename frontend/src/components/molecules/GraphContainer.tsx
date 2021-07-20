import { Flex, Stack } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { D3Edge } from '../../types/d3/simulation';
import { GraphEdge, GraphNode } from '../../types/databaseTypes';
import Graph from '../atoms/Graph';
import GraphDrawer from '../atoms/GraphDrawer';

// component wrapping the Graph, Graphtoolbar and GraphDescriptions. Also creates nodeFilter and edgeFilter callbacks
const GraphContainer: React.FC = () => {
  const [unlockNodes, setUnlockNodes] = useState<boolean>(false);
  const [edgeLabelsVisible, setEdgeLabelsVisible] = useState<boolean>(true);
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);



  return (
    <Stack
      spacing={isFullscreen ? 0 : 2}
      h={isFullscreen ? '100vh' : '65vh'}
      w={isFullscreen ? '100vw' : ''}
      position={isFullscreen ? 'absolute' : 'static'}
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
