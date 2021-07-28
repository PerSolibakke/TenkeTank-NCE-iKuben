import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { GoMarkGithub } from 'react-icons/go';

const About = () => (
  <Box py="10%" px="20%">
    <Stack
      spacing="10"
      align="center"
      bg="#6A199F"
      color="white"
      p="10"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Heading as="h2" size="lg">
        About the TenkeTank ontology
      </Heading>
      <Text fontSize="md" align="center">
        This is an on-going development to systemize and visualize the interdiciplinary competence 
        along with the accomplished achievements within the TenkeTank for young leaders at NCE | iKuben.
        The development is still in preliminary stages.
      </Text>
      <Link
        href="https://github.com/PerSolibakke/TenkeTank-NCE-iKuben"
        isExternal
        color="white"
        _hover={{ opacity: '75%' }}
      >
        <GoMarkGithub size="40" />
      </Link>
    </Stack>
  </Box>
);

export default About;