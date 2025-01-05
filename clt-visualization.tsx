import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CLTVisualization = () => {
  // Simulated data for visualization
  const populationData = Array.from({ length: 100 }, (_, i) => ({
    x: i * 0.1,
    population: Math.exp(-Math.pow(i * 0.1 - 2, 2) / 2) * Math.pow(i * 0.1, 1),
    sampleMeans: Math.exp(-Math.pow(i * 0.1 - 2, 2) / 4)
  }));

  return (
    <div className="w-full space-y-6 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white">Central Limit Theorem Demonstration</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={populationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="x" 
              stroke="#fff"
              label={{ value: 'Value', position: 'bottom', fill: '#fff' }}
            />
            <YAxis 
              stroke="#fff"
              label={{ value: 'Density', angle: -90, position: 'left', fill: '#fff' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="population" 
              name="Chi-square Population" 
              stroke="#ff4444" 
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="sampleMeans" 
              name="Sampling Distribution" 
              stroke="#4444ff" 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-400">Population Statistics</h3>
          <ul className="list-disc pl-6">
            <li>Mean: 2.001</li>
            <li>SD: 2.002</li>
            <li>Right-skewed distribution</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-400">Sample Mean Statistics</h3>
          <ul className="list-disc pl-6">
            <li>Mean: 1.999</li>
            <li>SE: 0.282</li>
            <li>Approximately normal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CLTVisualization;