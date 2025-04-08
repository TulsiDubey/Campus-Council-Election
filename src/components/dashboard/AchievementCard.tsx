
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, Calendar, Trophy, Target } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  year: string;
  type: 'award' | 'participation' | 'event' | 'goal' | 'trophy';
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getIcon = () => {
    switch (achievement.type) {
      case 'award':
        return <Award className="h-5 w-5 text-college-gold" />;
      case 'participation':
        return <Users className="h-5 w-5 text-college-navy" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-college-maroon" />;
      case 'trophy':
        return <Trophy className="h-5 w-5 text-college-gold" />;
      case 'goal':
        return <Target className="h-5 w-5 text-college-navy" />;
      default:
        return <Award className="h-5 w-5 text-college-gold" />;
    }
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{achievement.title}</CardTitle>
        <div className="rounded-full p-1.5 bg-muted">{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{achievement.description}</CardDescription>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{achievement.year}</span>
          <span className="text-xs capitalize px-2 py-1 rounded-full bg-muted">
            {achievement.type}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
