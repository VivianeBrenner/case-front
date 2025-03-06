import { Node, Edge } from "reactflow";

export type ProcessNode = Node<{ label: string }>;

export type ProcessEdge = Edge & { animated?: boolean };
