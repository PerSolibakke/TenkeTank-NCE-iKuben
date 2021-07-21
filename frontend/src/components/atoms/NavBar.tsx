import { Link,Flex, Text, Button, Box, Spacer } from '@chakra-ui/react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <Box w="100%" >
  <Flex bg="#6A199F" p={2} color="white">
  <Link href="/" fontSize= 'lg'  as="em">Ontology of TenkeTank for young leaders NCE | iKuben. </Link>
  <Spacer/>
  <Link href="/" fontSize= 'lg' as="em">About </Link>
    </Flex>
    </Box>
);
};

export default Navbar;