import { Flex, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Graph from '../molecules/Graph';
// component wrapping the Graph, will be expanded with further functionality.
const GraphPage: React.FC = () => {
  const [unlockNodes, setUnlockNodes] = useState<boolean>(false);
  const [edgeLabelsVisible, setEdgeLabelsVisible] = useState<boolean>(true);
  return (
    <Stack spacing={8} >
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
    </Stack>
  );
};
export default GraphPage;
export {};