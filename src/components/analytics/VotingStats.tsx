
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckSquare, Clock, BarChart2 } from 'lucide-react';

interface VotingStatsProps {
  totalVoters: number;
  votesSubmitted: number;
  timeRemaining: string;
}

const VotingStats: React.FC<VotingStatsProps> = ({ totalVoters, votesSubmitted, timeRemaining }) => {
  const participationRate = Math.round((votesSubmitted / totalVoters) * 100);
  
  const statCards = [
    {
      title: 'Total Eligible Voters',
      value: totalVoters,
      icon: <Users className="h-5 w-5 text-college-navy" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Votes Submitted',
      value: votesSubmitted,
      icon: <CheckSquare className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Time Remaining',
      value: timeRemaining,
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      color: 'bg-orange-50'
    },
    {
      title: 'Participation Rate',
      value: `${participationRate}%`,
      icon: <BarChart2 className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VotingStats;
