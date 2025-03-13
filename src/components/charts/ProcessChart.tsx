import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Process } from "../../types/process.types";

interface ProcessChartProps {
  processes: Process[];
}

const COLORS = ["#4CAF50", "#FFC107", "#F44336", "#2196F3", "#9C27B0"]; 

const ProcessChart: React.FC<ProcessChartProps> = ({ processes }) => {
  const statusCount: Record<string, number> = {};

  processes.forEach((proc) => {
    const st = proc.status || "Desconhecido";
    statusCount[st] = (statusCount[st] || 0) + 1;
  });

  const data = Object.entries(statusCount).map(([status, count], index) => ({
    name: status,
    value: count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="h-80 w-full bg-white rounded-lg shadow-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
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
