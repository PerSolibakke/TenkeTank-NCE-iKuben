import { Stack } from '@chakra-ui/react';
import React from 'react';
import GraphContainer from '../molecules/GraphContainer';

const GraphPage: React.FC = () => {

  return (
    <Stack spacing={8} >
      <GraphContainer />
    </Stack>
  );
};
export default GraphPage;
export {};