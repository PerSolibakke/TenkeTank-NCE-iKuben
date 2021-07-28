import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnontations, getTriplets } from '../../api/endpoints';
import GraphSimulation from '../../d3/GraphSimulation';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
import { setError } from '../../state/reducers/apiErrorReducer';
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
  const [annontations, setAnnontations] = useState<Array<Annotation>>();
  const dispatch = useDispatch();
  const [simulation, setSimulation] = useState<GraphSimulation>();
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

  const setDrawer = async (node: GraphNode): Promise<void>=> {
    setAnnontations(await getAnnontations(node.id))
  };

  const onSelectInformationNode = async (node: GraphNode): Promise<void>=> {
    dispatch(selectInformationNode(node));
    await setDrawer(node)
    dispatch(ToggleInformationBox());
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
      dispatch(setError(new Error('A node has not been selected by the user')));
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
      backgroundImage="url('https://www.teahub.io/photos/full/71-710634_sea-black-and-white-ocean-moored-buoy-hd.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      boxShadow="md"
      rounded="lg"
      hight='90vw'
      width={ '100%' }
    >
      <svg id="svgGraph" height="100%" width="100%" ref={svgRef} />
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
