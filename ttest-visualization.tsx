import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const TTestVisualization = () => {
  const patronAges = [25, 19, 37, 29, 40, 28, 31];
  const meanAge = patronAges.reduce((a, b) => a + b) / patronAges.length;
  
  const ageData = patronAges.map((age, index) => ({
    patron: `Patron ${index + 1}`,
    age: age
  }));

  return (
    <div className="w-full space-y-6 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white">Beach Comber Patron Ages Analysis</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="patron" 
              stroke="#fff"
              label={{ value: 'Patrons', position: 'bottom', fill: '#fff' }}
            />
            <YAxis 
              stroke="#fff"
              label={{ value: 'Age', angle: -90, position: 'left', fill: '#fff' }}
              domain={[15, 45]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="age" fill="#8884d8" name="Patron Age" />
            <ReferenceLine y={21} stroke="#ff4444" strokeDasharray="3 3" label={{ value: 'H₀: μ = 21', fill: '#ff4444' }} />
            <ReferenceLine y={meanAge} stroke="#44ff44" strokeDasharray="3 3" label={{ value: `x̄ = ${meanAge.toFixed(1)}`, fill: '#44ff44' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-400">Test Statistics</h3>
          <ul className="list-disc pl-6">
            <li>Sample Mean: 29.86</li>
            <li>Sample SD: 7.03</li>
            <li>t-statistic: 3.89</li>
            <li>p-value: 0.008</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-400">Conclusion</h3>
          <ul className="list-disc pl-6">
            <li>Reject H₀ at α = 0.05</li>
            <li>Strong evidence that mean age ≠ 21</li>
            <li>Average patron significantly older</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TTestVisualization;