import React, { useState } from 'react';
import { 
  BarChart, Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface Subskill {
  name: string;
  value: number;
}

interface SkillData {
  name: string;
  level: number;
  industry: number;
  category: string;
  subskills: Subskill[];
}

import { TooltipProps } from 'recharts';

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
};

const DataScienceProfile = () => {
  const [selectedView, setSelectedView] = useState('bar');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillData: SkillData[] = [
    {
      name: 'Data Viz',
      level: 6,
      industry: 7,
      category: 'Technical',
      subskills: [
        { name: 'ggplot2', value: 7 },
        { name: 'D3.js', value: 5 },
        { name: 'Tableau', value: 6 }
      ]
    },
    {
      name: 'Machine\nLearning',
      level: 7,
      industry: 8,
      category: 'Technical',
      subskills: [
        { name: 'Supervised', value: 8 },
        { name: 'Unsupervised', value: 7 },
        { name: 'Deep Learning', value: 6 }
      ]
    },
    {
      name: 'Mathematics',
      level: 6,
      industry: 7,
      category: 'Core',
      subskills: [
        { name: 'Linear Algebra', value: 6 },
        { name: 'Calculus', value: 6 },
        { name: 'Optimization', value: 6 }
      ]
    },
    {
      name: 'Statistics',
      level: 5,
      industry: 8,
      category: 'Core',
      subskills: [
        { name: 'Hypothesis Testing', value: 6 },
        { name: 'Regression', value: 5 },
        { name: 'Time Series', value: 4 }
      ]
    },
    {
      name: 'Computer\nScience',
      level: 9,
      industry: 7,
      category: 'Technical',
      subskills: [
        { name: 'Algorithms', value: 9 },
        { name: 'Data Structures', value: 9 },
        { name: 'System Design', value: 9 }
      ]
    },
    {
      name: 'Communication',
      level: 8,
      industry: 8,
      category: 'Soft Skills',
      subskills: [
        { name: 'Presentation', value: 8 },
        { name: 'Technical Writing', value: 8 },
        { name: 'Data Storytelling', value: 8 }
      ]
    },
    {
      name: 'Domain\nExpertise',
      level: 9,
      industry: 7,
      category: 'Business',
      subskills: [
        { name: 'Business Analytics', value: 9 },
        { name: 'Industry Knowledge', value: 9 },
        { name: 'Problem Solving', value: 9 }
      ]
    }
  ];

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps): JSX.Element => {
    if (!active || !payload || !payload.length) {
      return <></>;
    }
    
    const skill = skillData.find(s => s.name === label?.replace('\n', ' '));
    
    return (
      <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-white font-semibold text-lg mb-2">{label?.replace('\n', ' ')}</p>
        <p className="text-blue-400 mb-1">Your Level: {payload[0].value}/10</p>
        <p className="text-green-400">Industry: {payload[1].value}/10</p>
      </div>
    );
  };

  const renderChart = (): JSX.Element => {
    switch (selectedView) {
      case 'bar':
        return (
          <BarChart 
            data={skillData} 
            margin={{ top: 40, right: 40, left: 40, bottom: 100 }}
            barSize={40}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#444"
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke="#fff" 
              angle={45}
              interval={0}
              tickMargin={33}
              height={60}
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              stroke="#fff" 
              domain={[0, 10]}
              tickCount={6}
              tick={{ fill: '#fff' }}
              label={{ 
                value: 'Skill Level', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#fff',
                offset: -20
              }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Legend 
              wrapperStyle={{ color: '#fff' }} 
              verticalAlign="top"
              height={36}
            />
            <Bar 
              dataKey="level" 
              name="Your Level"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              onClick={(data) => setSelectedSkill(data.name)}
            />
            <Bar 
              dataKey="industry" 
              name="Industry Benchmark"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              opacity={0.7}
            />
          </BarChart>
        );
      
      case 'radar':
        return (
          <RadarChart data={skillData} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
            <PolarGrid stroke="#444" />
            <PolarAngleAxis 
              dataKey="name" 
              stroke="#fff"
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              stroke="#fff" 
              domain={[0, 10]}
              tick={{ fill: '#fff' }}
            />
            <Radar 
              name="Your Level" 
              dataKey="level" 
              stroke="#6366f1" 
              fill="#6366f1" 
              fillOpacity={0.5} 
            />
            <Radar 
              name="Industry" 
              dataKey="industry" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.3} 
            />
            <Legend 
              wrapperStyle={{ color: '#fff' }}
              verticalAlign="top"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="w-full space-y-4 bg-gray-900 text-white p-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Data Science Profile Analysis</h2>
          <p className="text-sm text-gray-400">Click on any skill for detailed breakdown</p>
        </div>
        <div className="space-x-2">
          {['bar', 'radar'].map(view => (
            <button 
              key={view}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === view 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} View
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 h-[45rem] bg-gray-800 rounded-lg p-6">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">
              {selectedSkill ? selectedSkill.replace('\n', ' ') : 'Profile Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSkill ? (
              <div className="space-y-4 text-gray-200">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="font-semibold mb-3">Skill Details</h3>
                  <div className="space-y-2">
                    {skillData
                      .find(s => s.name.replace('\n', ' ') === selectedSkill.replace('\n', ' '))
                      ?.subskills.map((subskill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{subskill.name}</span>
                            <span>{subskill.value}/10</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(subskill.value / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-200">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="font-semibold mb-3">Summary Statistics</h3>
                  <div className="space-y-2">
                    <p>Average Level: {(skillData.reduce((acc, curr) => acc + curr.level, 0) / skillData.length).toFixed(1)}/10</p>
                    <p>Strongest: {skillData.reduce((a, b) => a.level > b.level ? a : b).name.replace('\n', ' ')}</p>
                    <p>Growth Area: {skillData.reduce((a, b) => a.level < b.level ? a : b).name.replace('\n', ' ')}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="font-semibold mb-3">Category Overview</h3>
                  <div className="space-y-1 text-sm">
                    <p>Technical: Advanced</p>
                    <p>Core Skills: Intermediate</p>
                    <p>Soft Skills: Advanced</p>
                    <p>Business: Expert</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataScienceProfile;
