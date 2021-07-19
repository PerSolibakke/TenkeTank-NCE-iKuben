import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const Footer = () => {
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);

  if (isFullscreen) return <></>;

  return (
    <footer>
      <Center bg="	#4B0082" w="100%" p={4} color="whiteAlpha.800" h="10vh" mt="20">
        <Heading size="md">NCE iKuben: Tenketank for young leaders </Heading>
      </Center>
    </footer>
  );
};

export default Footer;
