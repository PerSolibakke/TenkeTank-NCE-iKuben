import React from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure} from '@chakra-ui/react';
import { ToggleInformationBox } from '../../state/reducers/informationBoxReducer';
import { clearSelectedInformationNode } from '../../state/reducers/databaseReducer';
import { useDispatch } from 'react-redux';
import { Annotation } from '../../types/databaseTypes';
type GraphDrawerProps = {
    informationNode: Array<Annotation> | undefined
  };
  
  const GraphDrawer: React.FC<GraphDrawerProps> = ({
      informationNode,
  }: GraphDrawerProps) => {  
    const btnRef = React.useRef()  as React.MutableRefObject<HTMLInputElement> | undefined;
    const dispatch = useDispatch();
    if (informationNode == undefined) { return (
      <>
        <Drawer
          isOpen={true}
          placement="right"
          onClose={() => dispatch(ToggleInformationBox())}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Not working yet</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => dispatch(ToggleInformationBox())}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>

    )}
    console.log(informationNode)
    console.log(informationNode[0].label)
    return (
      <>
        <Drawer
          isOpen={true}
          placement="right"
          onClose={() => {dispatch(ToggleInformationBox())
            dispatch(clearSelectedInformationNode())}}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{informationNode[0].label}</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => {dispatch(ToggleInformationBox())
              dispatch(clearSelectedInformationNode())}}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>

    )
  }
  export default GraphDrawer;