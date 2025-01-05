import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TTestVisualization = () => {
  const [selectedView, setSelectedView] = useState('bar');
  const patronAges = [25, 19, 37, 29, 40, 28, 31];
  const meanAge = patronAges.reduce((a, b) => a + b) / patronAges.length;
  const n = patronAges.length;
  const stdDev = Math.sqrt(patronAges.reduce((a, b) => a + Math.pow(b - meanAge, 2), 0) / (n - 1));
  const tStat = (meanAge - 21) / (stdDev / Math.sqrt(n));
  const df = n - 1;
  
  // Generate density curve data
  const densityData = Array.from({ length: 100 }, (_, i) => {
    const x = 15 + (i * 30) / 100;
    const y = Math.exp(-Math.pow(x - meanAge, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    return { x, y };
  });

  // Data for bar chart
  const barData = patronAges.map((age, index) => ({
    patron: `Patron ${index + 1}`,
    age: age,
    density: densityData.find(d => Math.abs(d.x - age) < 0.3)?.y || 0
  }));

  // Calculate confidence interval
  const tCritical = 2.447; // 95% CI for df=6
  const marginError = tCritical * (stdDev / Math.sqrt(n));
  const ciLower = meanAge - marginError;
  const ciUpper = meanAge + marginError;

  return (
    <div className="w-full space-y-4 bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Beach Comber Age Analysis</h2>
        <div className="space-x-2">
          <button 
            className={`px-4 py-2 rounded ${selectedView === 'bar' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setSelectedView('bar')}
          >
            Bar Chart
          </button>
          <button 
            className={`px-4 py-2 rounded ${selectedView === 'density' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setSelectedView('density')}
          >
            Density
          </button>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {selectedView === 'bar' ? (
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="patron" stroke="#fff" />
              <YAxis stroke="#fff" domain={[15, 45]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="age" fill="#8884d8" name="Age" />
              <ReferenceLine y={21} stroke="#ff4444" strokeDasharray="3 3" label={{ value: 'H₀: μ = 21', fill: '#ff4444' }} />
              <ReferenceLine y={meanAge} stroke="#44ff44" strokeDasharray="3 3" label={{ value: `x̄ = ${meanAge.toFixed(1)}`, fill: '#44ff44' }} />
              <ReferenceLine y={ciLower} stroke="#4444ff" strokeDasharray="3 3" />
              <ReferenceLine y={ciUpper} stroke="#4444ff" strokeDasharray="3 3" />
            </BarChart>
          ) : (
            <LineChart data={densityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="x" stroke="#fff" domain={[15, 45]} />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
              <ReferenceLine x={21} stroke="#ff4444" strokeDasharray="3 3" label={{ value: 'H₀: μ = 21', fill: '#ff4444' }} />
              <ReferenceLine x={meanAge} stroke="#44ff44" strokeDasharray="3 3" label={{ value: `x̄ = ${meanAge.toFixed(1)}`, fill: '#44ff44' }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Test Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <ul className="space-y-2">
              <li>Sample Mean: {meanAge.toFixed(2)}</li>
              <li>Sample SD: {stdDev.toFixed(2)}</li>
              <li>t-statistic: {tStat.toFixed(2)}</li>
              <li>p-value: 0.008</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Confidence Interval</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <ul className="space-y-2">
              <li>95% CI: ({ciLower.toFixed(1)}, {ciUpper.toFixed(1)})</li>
              <li>Margin of Error: ±{marginError.toFixed(1)}</li>
              <li>df: {df}</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Effect Size</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <ul className="space-y-2">
              <li>Cohen's d: {((meanAge - 21) / stdDev).toFixed(2)}</li>
              <li>Mean Difference: {(meanAge - 21).toFixed(1)}</li>
              <li>Relative Change: {(((meanAge - 21) / 21) * 100).toFixed(1)}%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TTestVisualization;