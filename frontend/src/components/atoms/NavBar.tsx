import { Link,Flex, Box, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Box w="100%" >
  <Flex bg="#6A199F" p={2} color="white">
  <Link  fontSize= 'lg'   as={RouteLink} to= "/">Ontology of TenkeTank for young leaders NCE | iKuben. </Link>
  <Spacer/>
  <Link fontSize= 'lg'  as={RouteLink} to= "/about"> About </Link>
    </Flex>
    </Box>
);
};

export default Navbar;