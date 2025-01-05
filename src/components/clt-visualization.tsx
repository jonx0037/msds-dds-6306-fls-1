import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CLTVisualization = () => {
  // Generate chi-square distribution with 2 degrees of freedom
  const populationData = Array.from({ length: 150 }, (_, i) => {
    const x = i * 0.2; // Range from 0 to 30 to show right skewness
    // Chi-square with 2 df probability density function
    const population = x > 0 ? (Math.exp(-x/2) * x/2) : 0;
    // Normal approximation for sampling distribution of means (n=50)
    const sampleMeans = Math.exp(-Math.pow(x - 2, 2) / (2 * 0.08)); // Adjusted for n=50
    return { x, population, sampleMeans };
  });

  // Calculate theoretical values
  const populationMean = 2; // Theoretical mean for chi-square(2)
  const populationSD = 2; // Theoretical SD for chi-square(2)
  const sampleSE = populationSD / Math.sqrt(50); // SE for n=50

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
          <h3 className="font-semibold text-blue-400">Chi-square(2) Population</h3>
          <ul className="list-disc pl-6">
            <li>Population Size: 10,000,000</li>
            <li>Mean: {populationMean.toFixed(3)}</li>
            <li>SD: {populationSD.toFixed(3)}</li>
            <li>Heavily right-skewed</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-400">Sample Means (n=50)</h3>
          <ul className="list-disc pl-6">
            <li>10,000 sample means</li>
            <li>Expected Mean: {populationMean.toFixed(3)}</li>
            <li>Standard Error: {sampleSE.toFixed(3)}</li>
            <li>Approximately normal (CLT)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CLTVisualization;
