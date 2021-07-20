import { GraphNode, Node } from '../../types/databaseTypes';
import {
  CLEAR_SELECTED_NODE,
  CLEAR_SELECTED_INFORMATION_NODE,
  OntologyState,
  OntologyStateAction,
  SELECT_NODE,
  SELECT_INFORMATION_NODE,
} from '../../types/redux/databaseTypes';


const defaultState: OntologyState = {
  selectedNode: undefined,
  selectedInformationNode: undefined,
};

const ontologyReducer = (
  state: OntologyState = defaultState,
  action: OntologyStateAction,
): OntologyState => {
  switch (action.type) {
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };
    case SELECT_INFORMATION_NODE:
      return {
        ...state,
        selectedInformationNode: action.payload,
      };  
    case CLEAR_SELECTED_NODE:
      return {
        ... state,
        selectedNode : undefined,
      };
    case CLEAR_SELECTED_INFORMATION_NODE:
      return {
        ... state,
        selectedInformationNode : undefined,
      };    
    default:
      return state;
  }
};

export const selectNode = (node: Node): OntologyStateAction => ({
  type: 'SELECT_NODE',
  payload: node,
});


export const clearSelectedNode = (): OntologyStateAction => ({ type: 'CLEAR_SELECTED_NODE' });

export const selectInformationNode = (node: GraphNode): OntologyStateAction => ({
  type: 'SELECT_INFORMATION_NODE',
  payload: node,
});


export const clearSelectedInformationNode = (): OntologyStateAction => ({ type: 'CLEAR_SELECTED_INFORMATION_NODE' });

export default ontologyReducer;
