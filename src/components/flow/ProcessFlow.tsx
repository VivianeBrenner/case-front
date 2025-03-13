import React from "react";
import ReactFlow, {
    Node,
    Edge,
    MiniMap,
    Controls,
    Background,
} from "reactflow";
import "reactflow/dist/style.css";

import { Process } from "../../types/process.types";
import { Subprocess } from "../../types/process.types";

interface ProcessFlowProps {
    processes: Process[];

}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ processes }) => {
    const { nodes, edges } = buildNodesAndEdges(processes);
console.log(processes)
    return (
        <div className="w-full h-[450px] bg-white p-4 rounded-lg shadow-md overflow-hidden">
            <ReactFlow nodes={nodes} edges={edges} fitView style={{ width: "100%", height: "100%" }}>
                <MiniMap style={{ width: 150, height: 100 }} />
                <Controls showInteractive={false} />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default ProcessFlow;

function buildNodesAndEdges(processes: Process[]) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];


    let globalX = 50;
    let globalY = 50;

    processes.forEach((proc) => {

        const parentNodeId = `proc-${proc.id}`;
        nodes.push({
            id: parentNodeId,
            position: { x: globalX, y: globalY },
            data: { label: proc.nome },
        });

        globalY += 150;


        const { newNodes, newEdges, offsetY } = buildSubprocessNodes(
            proc.subprocesses,
            parentNodeId,
            globalX + 250,
            globalY
        );


        nodes.push(...newNodes);
        edges.push(...newEdges);


        globalY += offsetY;
    });

    return { nodes, edges };
}


function buildSubprocessNodes(
    subprocesses: Subprocess[] | undefined,
    parentId: string,
    baseX: number,
    baseY: number
): { newNodes: Node[]; newEdges: Edge[]; offsetY: number } {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    if (!subprocesses || subprocesses.length === 0) {
        return { newNodes, newEdges, offsetY: 0 };
    }

    let localY = baseY;
    const X_STEP = 250;

    subprocesses.forEach((sub) => {
        const subNodeId = `sub-${sub.id}`;

        newNodes.push({
            id: subNodeId,
            position: { x: baseX, y: localY },
            data: { label: sub.nome },
        });

        newEdges.push({
            id: `edge-${parentId}-${subNodeId}`,
            source: parentId,
            target: subNodeId,
            animated: true,
        });


        const { newNodes: childNodes, newEdges: childEdges, offsetY: childOffset } =
            buildSubprocessNodes(
                sub.subprocesses,
                subNodeId,
                baseX + X_STEP,
                localY + 100
            );

        newNodes.push(...childNodes);
        newEdges.push(...childEdges);


        localY += 100 + childOffset;
    });


    const offsetY = localY - baseY;
    return { newNodes, newEdges, offsetY };
}
