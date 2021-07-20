import { Link,Flex, Image, Button, Box, Spacer } from '@chakra-ui/react';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <Box w="100%">
  <Flex bg="gray" p={2} color="white">
     <Image
      src={'https://ikuben-tenketank.herokuapp.com/assets/ikuben-logo-cb4d35beb7ede6fa21e1c5c2c5f875efbb9780ca346dd516b788bc8a8879654b.png'}
      borderRadius="lg"
      overflow="hidden"
      alt={'NCE iKuben'}
      objectFit="cover"
      href="/"
    />
    </Flex>
    </Box>
);
};

export default Navbar;