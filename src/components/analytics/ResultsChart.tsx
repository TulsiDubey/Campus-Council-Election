
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsChartProps {
  data: {
    name: string;
    votes: number;
    position: string;
  }[];
  position: string;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ data, position }) => {
  // Colors for bars
  const getBarColor = () => {
    switch (position) {
      case 'President':
        return '#0A2463';
      case 'Vice President':
        return '#3E92CC';
      case 'Joint Cultural Secretary':
        return '#FCBF49';
      case 'Joint Sports Secretary':
        return '#8B1E3F';
      case 'Ladies Representative':
        return '#2A9D8F';
      default:
        return '#0A2463';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{position} Results</CardTitle>
        <CardDescription>Distribution of votes among candidates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value} votes`, 'Total']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="votes" fill={getBarColor()} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
