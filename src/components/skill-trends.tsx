import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface SkillData {
  date: string;
  [key: string]: string | number;
}

interface GrowthMetrics {
  growth: number;
  percentGrowth: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const SkillTrends = () => {
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Filter data based on time range
  const filterDataByRange = (data: SkillData[], range: string): SkillData[] => {
    const endDate = new Date('2024-01');
    const ranges: { [key: string]: number } = {
      '6m': 6,
      '1y': 12,
      'all': 999
    };
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const monthsDiff = (endDate.getFullYear() - itemDate.getFullYear()) * 12 + 
                        (endDate.getMonth() - itemDate.getMonth());
      return monthsDiff <= ranges[range];
    });
  };

  // Historical skill data
  const fullSkillData: SkillData[] = [
    {
      date: 'Jan 2023',
      'Data Viz': 4,
      'Machine Learning': 5,
      'Mathematics': 5,
      'Statistics': 3,
      'Computer Science': 7,
      'Communication': 6,
      'Domain Expertise': 7
    },
    {
      date: 'Jul 2023',
      'Data Viz': 5,
      'Machine Learning': 6,
      'Mathematics': 5,
      'Statistics': 4,
      'Computer Science': 8,
      'Communication': 7,
      'Domain Expertise': 8
    },
    {
      date: 'Jan 2024',
      'Data Viz': 6,
      'Machine Learning': 7,
      'Mathematics': 6,
      'Statistics': 5,
      'Computer Science': 9,
      'Communication': 8,
      'Domain Expertise': 9
    }
  ];

  const skills = [
    'Data Viz',
    'Machine Learning',
    'Mathematics',
    'Statistics',
    'Computer Science',
    'Communication',
    'Domain Expertise'
  ];

  // Calculate growth metrics
  // Filter data based on selected time range
  const skillData = filterDataByRange(fullSkillData, timeRange);

  const calculateGrowth = (skill: string): GrowthMetrics => {
    const firstValue = skillData[0][skill] as number;
    const lastValue = skillData[skillData.length - 1][skill] as number;
    const growth = lastValue - firstValue;
    const percentGrowth = ((lastValue - firstValue) / firstValue * 100).toFixed(1);
    return { growth, percentGrowth };
  };

  const getGrowthColor = (growth: number): string => {
    if (growth > 0) return 'text-green-400';
    if (growth < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return <></>;
    return (
      <div className="bg-gray-800 p-3 rounded border border-gray-700">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Skill Development Trends</h2>
        <div className="space-x-2">
          {['6m', '1y', 'all'].map(range => (
            <button
              key={range}
              className={`px-4 py-2 rounded ${
                timeRange === range ? 'bg-blue-600' : 'bg-gray-700'
              } text-white`}
              onClick={() => setTimeRange(range as '6m' | '1y' | 'all')}
            >
              {range === '6m' ? '6 Months' : range === '1y' ? '1 Year' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-gray-800 p-4 rounded-lg" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={skillData} 
                margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#fff"
                />
                <YAxis 
                  stroke="#fff"
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    top: '-10px',
                    color: '#fff'
                  }}
                  onClick={(data) => setSelectedSkill(data.dataKey as string)}
                />
                {skills.map((skill, index) => (
                  <Line
                    key={skill}
                    type="monotone"
                    dataKey={skill}
                    stroke={`hsl(${index * 360 / skills.length}, 70%, 60%)`}
                    strokeWidth={selectedSkill === skill ? 3 : 1}
                    dot={selectedSkill === skill}
                    opacity={selectedSkill ? (selectedSkill === skill ? 1 : 0.2) : 1}
                    onClick={() => setSelectedSkill(skill)}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">
              {selectedSkill ? `${selectedSkill} Growth` : 'Overall Growth'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-200">
              {selectedSkill ? (
                <>
                  <div className="space-y-2">
                    <p>Starting Level: {skillData[0][selectedSkill]}</p>
                    <p>Current Level: {skillData[skillData.length - 1][selectedSkill]}</p>
                    <p className={getGrowthColor(calculateGrowth(selectedSkill).growth)}>
                      Growth: {calculateGrowth(selectedSkill).growth} points 
                      ({calculateGrowth(selectedSkill).percentGrowth}%)
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <p>Click on a skill line for details</p>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Top Growth Areas</h3>
                    {skills
                      .map(skill => ({
                        skill,
                        ...calculateGrowth(skill)
                      }))
                      .sort((a, b) => b.growth - a.growth)
                      .slice(0, 3)
                      .map((item, index) => (
                        <p key={index} className={getGrowthColor(item.growth)}>
                          {item.skill}: +{item.growth} points ({item.percentGrowth}%)
                        </p>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillTrends;
