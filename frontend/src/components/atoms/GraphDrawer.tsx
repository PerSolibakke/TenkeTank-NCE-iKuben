import React, { useEffect } from 'react';
import { Button, Image, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure, Link, Box} from '@chakra-ui/react';
import { ToggleInformationBox } from '../../state/reducers/informationBoxReducer';
import { clearSelectedInformationNode } from '../../state/reducers/databaseReducer';
import { setError } from '../../state/reducers/apiErrorReducer';
import { useDispatch } from 'react-redux';
import { Annotation } from '../../types/databaseTypes';
import { isUrl } from '../../common/regex';
type GraphDrawerProps = {
    informationNode: Array<Annotation> | undefined
  };
  
  const GraphDrawer: React.FC<GraphDrawerProps> = ({
      informationNode,
  }: GraphDrawerProps ) => {  
    const btnRef = React.useRef()  as React.MutableRefObject<HTMLInputElement> | undefined;
    const dispatch = useDispatch();
    if (!informationNode || informationNode[0].label == '') {
        dispatch(setError(new Error('Database disconnected')));
        return (<> </>);
      }
    return (
      <>
        <Drawer
          isOpen={true}
          placement="right"
          onClose={() => {dispatch(ToggleInformationBox())
            dispatch(clearSelectedInformationNode())}}
            size = "md"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent >
            <DrawerCloseButton />
            <DrawerHeader >{informationNode[0].label}</DrawerHeader>
  
            <DrawerBody>
                          {informationNode[0].icon &&
            <Box fontSize="lg" mt="2" >
                 {informationNode[0].icon ?
                          <Image 
                          src={informationNode[0].icon}
                             borderRadius="lg"
                           overflow="hidden"
                            alt="Connection with link address failed"
                            h = "300px"
                            w ="250px"
                             object-fit="cover" 
                             marginBottom= '5px'
                             />
                 : (
                  ' '
                )   }
              </Box>
                }
                  <Text fontSize="lg" as="em" marginBottom= '5px'>
                  {informationNode[0].title
                ? 'Position: ' + informationNode[0].title
                : ''}
                 </Text>
                 <Text fontSize="md" mt="2" marginBottom= '5px'>
              {informationNode[0].description
                ? 'Description: ' +  informationNode[0].description
                : ''}
            </Text>
            <Text fontSize="md" mt="2" as="cite">
              {informationNode[0].citation
                ? 'Citation: ' + informationNode[0].citation
                : ''}
            </Text>
            {informationNode[0].moreInformation &&
            <Text fontSize="lg" mt="2" >
                More information can be found here:
                {'  '}
                {isUrl(informationNode[0].moreInformation) ? (
                  <Link href={informationNode[0].moreInformation} isExternal fontWeight="bold">
                    {informationNode[0].moreInformation}
                  </Link>
                ) : (
                  informationNode[0].moreInformation
                )}
              </Text>
                }
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => {dispatch(ToggleInformationBox())
              dispatch(clearSelectedInformationNode())}}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>

    )
  }
  export default GraphDrawer;