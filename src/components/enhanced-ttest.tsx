import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface BarData {
  patron: string;
  age: number;
  density: number;
}

interface DensityData {
  x: number;
  y: number;
}

const TTestVisualization = () => {
  const [selectedView, setSelectedView] = useState('bar');
  const patronAges = [25, 19, 37, 29, 40, 28, 31];
  const meanAge = patronAges.reduce((a, b) => a + b) / patronAges.length;
  const n = patronAges.length;
  const stdDev = Math.sqrt(patronAges.reduce((a, b) => a + Math.pow(b - meanAge, 2), 0) / (n - 1));
  const tStat = (meanAge - 21) / (stdDev / Math.sqrt(n));
  const df = n - 1;
  
  // Generate density curve data
  const densityData: DensityData[] = Array.from({ length: 100 }, (_, i) => {
    const x = 15 + (i * 30) / 100;
    const y = Math.exp(-Math.pow(x - meanAge, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    return { x, y };
  });

  // Data for bar chart
  const barData: BarData[] = patronAges.map((age, index) => ({
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
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Interactive Analysis</h3>
          <p className="text-sm text-gray-400 mb-4">Dynamic t-test visualization with real-time statistics</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-green-400 mb-4">RStudio Analysis</h3>
          <p className="text-sm text-gray-400 mb-2">Comprehensive t-test analysis in R</p>
          <a 
            href="https://rpubs.com/jonx03/beach-comber-ttest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 block"
          >
            View detailed analysis on RPubs →
          </a>
          <img 
            src="/msds-dds-6306-fls-1/rstudio-produced-images/ttest_plot.png" 
            alt="RStudio T-Test Analysis"
            className="w-full h-auto rounded-lg border border-gray-700"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-400">Beach Comber Age Analysis</h2>
        <div className="space-x-2 bg-gray-800 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded ${selectedView === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setSelectedView('bar')}
          >
            Bar Chart
          </button>
          <button 
            className={`px-4 py-2 rounded ${selectedView === 'density' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setSelectedView('density')}
          >
            Density
          </button>
        </div>
      </div>

      <div className="h-[28rem] bg-gray-800 p-4 rounded-lg">
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

      <div className="grid grid-cols-3 gap-6 mt-8">
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
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

        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
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

        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
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
