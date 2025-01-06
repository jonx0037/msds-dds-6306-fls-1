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
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Chi-square Distribution Analysis</h2>
      <div className="h-[32rem] bg-gray-800 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={populationData}
            margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="x" 
              stroke="#fff"
              label={{ 
                value: 'Value', 
                position: 'bottom', 
                fill: '#fff',
                offset: 45
              }}
            />
            <YAxis 
              stroke="#fff"
              label={{ 
                value: 'Density', 
                angle: -90, 
                position: 'left', 
                fill: '#fff',
                offset: -45
              }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingBottom: '20px' }}
            />
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
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Chi-square(2) Population</h3>
          <ul className="space-y-3 text-gray-300">
            <li>Population Size: 10,000,000</li>
            <li>Mean: {populationMean.toFixed(3)}</li>
            <li>SD: {populationSD.toFixed(3)}</li>
            <li>Heavily right-skewed</li>
          </ul>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">Sample Means (n=50)</h3>
          <ul className="space-y-3 text-gray-300">
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
