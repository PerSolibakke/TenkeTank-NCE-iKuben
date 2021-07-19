import { Heading, Container, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import  Tenketank  from '../molecules/Tenketank';


const frontpage: React.FC = () => (
  <Container  maxW="xl" centerContent padding='100px' marginTop='200px'>
    <Tenketank />
  </Container>
);

export default frontpage;