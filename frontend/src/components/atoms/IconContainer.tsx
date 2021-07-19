import React from 'react';
import { Image } from '@chakra-ui/react';
import { TenkeTank } from '../../types/databaseTypes';
import { MotionBox } from '../../types/react/componentTypes';

type IconContainerProps = {
  tenkeTankNode: TenkeTank;
  onClick: (tt: TenkeTank) => void;
};

const IconContainer: React.FC<IconContainerProps> = ({
  tenkeTankNode,
  onClick,
}: IconContainerProps) => (
  <MotionBox
    p={0}
    whileHover={{ scale: 1.05 }}
    _hover={{
      cursor: 'pointer',
    }}
    onClick={() => onClick(tenkeTankNode)}
  >
    <Image
      src={tenkeTankNode.icon}
      borderRadius="lg"
      overflow="hidden"
      alt={tenkeTankNode.name}
      boxSize="250"
      object-fit="cover"
    />
  </MotionBox>
);

export default IconContainer;