import { Prefix } from '@innotrade/enapso-graphdb-client';

export interface Entity {
  prefix: Prefix;
  id: string;
  name: string;
}

export type Annontation = {
  label: string;
  icon: string| null;
  description: string | null;
  title: string | null;
  moreInformation: string | null;
  citation: string | null;
};

export interface Node extends Entity {
  type: string;
}

export interface Edge extends Entity {
}
export interface InitalNode extends Node {
  title: string;
}

export type Triplet = {
  Subject: Node | null;
  Object: Node | null;
  Predicate: Edge | null;
};

export type Record = {
  Subject: string | null;
  SubjectLabel: string | null;
  Object: string | null;
  ObjectLabel: string | null;
  TypeLabel: string | null;
  Predicate: string;
};

