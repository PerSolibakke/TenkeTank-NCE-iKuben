import { Box, IconButton } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { GiContract, GiExpand } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnontations, getTriplets } from '../../api/endpoints';
import GraphSimulation from '../../d3/GraphSimulation';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
import { setError } from '../../state/reducers/apiErrorReducer';
import { toggleFullscreen } from '../../state/reducers/fullscreenReducer';
import { ToggleInformationBox } from '../../state/reducers/informationBoxReducer';
import { selectNode, selectInformationNode } from '../../state/reducers/databaseReducer';
import { RootState } from '../../state/store';
import { Annotation, GraphNode } from '../../types/databaseTypes';
import GraphDrawer from '../atoms/GraphDrawer';



type GraphProps = {
  unlockAllNodes: boolean;
  edgeLabelsVisible: boolean;
};

const Graph: React.FC<GraphProps> = ({
  unlockAllNodes,
  edgeLabelsVisible,
}: GraphProps) => {
  const { height, width } = useWindowDimensions();
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedNode = useSelector((state: RootState) => state.database.selectedNode);
  const selectedInformationNode = useSelector((state: RootState) => state.database.selectedInformationNode);
  const [annontations, setAnnontations] = useState<Array<Annotation>>();
  const dispatch = useDispatch();
  const [simulation, setSimulation] = useState<GraphSimulation>();
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);
  const { isInformationBox } = useSelector((state: RootState) => state.informationBoxStatus);
  const [hasInitialized, setHasInitialized] = useState(false);

  const loadData = async (node: GraphNode) => {
    if (!simulation) return;
    const ontologies = await getTriplets(node.id);
    simulation.addData(ontologies, node);
  };
  // callback triggered when expand button is clicked in node menu
  const onExpandNode = (node: GraphNode): void => {
    loadData(node);
  };

  // callback triggered when information button is clicked in node menu
  const onSelectNode = (node: GraphNode): void=> {
    dispatch(selectNode(node));
  };

  const onSelectInformationNode = async (node: GraphNode): Promise<void>=> {
    await dispatch(selectInformationNode(node));
    if(!selectedInformationNode) {return}
    setAnnontations(await getAnnontations(selectedInformationNode.id))
    await dispatch(ToggleInformationBox());
      };

  const createNewGraphSimulation = () => {
    if (!svgRef || !svgRef.current || !selectedNode) return;
    setSimulation(
      new GraphSimulation(
        svgRef.current,
        0.4 * width,
        0.4 * height,
        selectedNode,
        onExpandNode,
        onSelectNode,
        onSelectInformationNode,
      ),
    );
  };

  useEffect(() => {
    if (simulation) simulation.updateOnExpandCallback(onExpandNode);
  }, [onExpandNode]);

  useEffect(() => {
    if (simulation) simulation.updateOnInformationCallback(onSelectInformationNode);
  }, [onSelectInformationNode]);


  // Useeffect to initialize the graph simulation and to add more data as it is received from the API
  useEffect(() => {
    if (!svgRef || !svgRef.current) return;
    if (!selectedNode) {
      dispatch(setError(new Error('Du har ikke valgt en node i grafen')));
      return;
    }
    if (!simulation) {
      createNewGraphSimulation();
    } else if (!hasInitialized) {
      setHasInitialized(true);
      loadData(selectedNode);
    }
  }, [selectedNode, svgRef, simulation]);


  useEffect(() => {
    if (simulation) simulation.unlockAllNodes();
  }, [unlockAllNodes]);

  useEffect(() => {
    if (simulation) simulation.toggleEdgeLabelsVisibility(edgeLabelsVisible);
  }, [edgeLabelsVisible]);

  return (
    <>
    <Box
      position="relative"
      bg="white"
      boxShadow="md"
      rounded="lg"
      width={isFullscreen ? '100vw' : ['70vw', '70vw', '75vw', '77vw', '75vw']}
    >
      <svg id="svgGraph" height="100%" width="100%" ref={svgRef} />
      <IconButton
        aria-label="Fullskjerm"
        color="cyan.700"
        size="lg"
        position="absolute"
        right="4"
        bottom="4"
        colorScheme="gray"
        onClick={() => dispatch(toggleFullscreen())}
        zIndex={1}
        icon={isFullscreen ? <GiContract size="40" /> : <GiExpand size="40" />}
      />
    </Box>
      {!isInformationBox && (
        <>
          <GraphDrawer informationNode ={annontations}  />
        </>
      )}
      </>
  );
};

export default Graph;
