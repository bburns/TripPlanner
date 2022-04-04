import { User, UserId, INode, NodeId, NodeValue, Pattern } from '../types';

export interface Datastore {
  createNode(node: INode): Promise<INode>;
  // createNodes(nodes: INode[]): Promise<INode[]>;
  createUser(user: User): Promise<User>;
  deleteNode(nodeId: NodeId): void;
  deleteNodeValue(nodeId: NodeId, fieldId: NodeId): void;
  deleteUser(userId: UserId): Promise<void>;
  getCurrentUserId(): UserId|undefined; //. ditch?
  getNode(nodeId: NodeId): Promise<INode>;
  getNodes(pattern?: Pattern): Promise<INode[]>;
  getNodeValue(nodeId: NodeId, fieldId: NodeId): Promise<NodeValue>;
  getUser(userId: UserId): Promise<User|undefined>;
  saveNodes(nodes: INode[]): void; //?
  setCurrentUserId(userId?: UserId): void; //.?
  setNodeValue(nodeId: NodeId, fieldId: NodeId, fieldValue: NodeValue): void;
  setNodeValues(nodeId: NodeId, values: object): void;
}
