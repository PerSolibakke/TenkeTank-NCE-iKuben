import {  Node, GraphNode } from '../databaseTypes';


export type OntologyState = {
  selectedNode?: Node;
  selectedInformationNode?: GraphNode;
};

export type SelectNodeAction = {
  type: typeof SELECT_NODE;
  payload: Node;
};

export type SelectInformationNodeAction = {
  type: typeof SELECT_INFORMATION_NODE;
  payload: Node;
};

export type ClearSelectedNodeAction = {
  type: typeof CLEAR_SELECTED_NODE;
};

export type ClearSelectedIformationNodeAction = {
  type: typeof CLEAR_SELECTED_INFORMATION_NODE;
};



export type OntologyStateAction =
  | SelectNodeAction
  | ClearSelectedNodeAction
  | SelectInformationNodeAction
  | ClearSelectedIformationNodeAction


export const SELECT_NODE = 'SELECT_NODE';
export const SELECT_INFORMATION_NODE = 'SELECT_INFORMATION_NODE';
export const CLEAR_SELECTED_NODE = 'CLEAR_SELECTED_NODE';
export const CLEAR_SELECTED_INFORMATION_NODE = 'CLEAR_SELECTED_INFORMATION_NODE';
