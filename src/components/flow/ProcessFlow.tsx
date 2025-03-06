import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { ProcessNode, ProcessEdge } from "../../types/flow.types";

const nodes: ProcessNode[] = [
    { id: "1", position: { x: 250, y: 0 }, data: { label: "Processo Principal" } },
    { id: "2", position: { x: 100, y: 100 }, data: { label: "Subprocesso 1" } },
    { id: "3", position: { x: 400, y: 100 }, data: { label: "Subprocesso 2" } },
];

const edges: ProcessEdge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3", animated: true },
];

const ProcessFlow = () => {
    return (
        <div className="w-full h-[350px] bg-white p-4 rounded-lg shadow-md overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                style={{ width: "100%", height: "100%" }}
            >
                <MiniMap
                    style={{ width: 150, height: 100 }}
                    className="rounded-lg shadow-md"
                    nodeColor={(node) => (node.type === "input" ? "#4A90E2" : "#E94E77")}
                    nodeStrokeWidth={2}
                />
                <Controls showInteractive={false} />
                <Background />
            </ReactFlow>
        </div>

    );
};

export default ProcessFlow;
