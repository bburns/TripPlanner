// neomem types
import { Neomem } from './classes';

export { Neomem };

export interface IPlugin {
  initialize(neomem: Neomem): void;
  loadData(): void;
}

export type Auth = any;

export interface INode {
  id: NodeId;
  // define types for some known (optional) fields
  //. need to make some observable? name, description, depth?
  // name?: string;
  // description?: string;
  // typeId?: string;
  // parentId?: NodeId;
  // childIds?: string;
  // depth?: number;
  system?: boolean;

  // and let user add anything they want to nodes - lose type safety though
  [index: string]: NodeValue;

  // constructor(props: Props);
};


export type NodeId = string;
export type NodeValue = string | number | boolean | Node[] | null | undefined; // almost anything goes...

export type UserId = string;
export type User = {
  // [index:string]: any, //. cheat
  id: UserId;
}

export type Props = {
  [index:string]: any,
};

export type Cache = {
  [index:string]: INode,
}
// export type Cache = Map<NodeId,INode>

export type Pattern = {
  [index:string]: any,
}
