import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Concluídos", value: 4, color: "#4CAF50" },
    { name: "Em Andamento", value: 6, color: "#FFC107" },
    { name: "Pendentes", value: 2, color: "#F44336" },
];

const ProcessChart = () => {
    return (
        <div className="h-80 w-full bg-white rounded-lg shadow-md p-4">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                    data={data} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80} 
                    dataKey="value"
                
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProcessChart;
