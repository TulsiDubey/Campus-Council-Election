
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import EventSlideshow from '@/components/dashboard/EventSlideshow';
import AchievementCard, { Achievement } from '@/components/dashboard/AchievementCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Vote } from 'lucide-react';

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Best College Council Award",
    description: "Recognized for exceptional leadership and campus initiatives by the State Education Board.",
    year: "2023",
    type: "award"
  },
  {
    id: 2,
    title: "Record Participation",
    description: "Achieved 95% student participation in campus-wide activities and welfare programs.",
    year: "2022",
    type: "participation"
  },
  {
    id: 3,
    title: "Inter-College Summit",
    description: "Successfully hosted delegates from 15 colleges for leadership and innovation summit.",
    year: "2023",
    type: "event"
  },
  {
    id: 4,
    title: "First Place - Cultural Competition",
    description: "Won the prestigious statewide cultural competition among 30 participating colleges.",
    year: "2022",
    type: "trophy"
  },
  {
    id: 5,
    title: "Campus Renovation Project",
    description: "Led successful initiative to revamp student recreation spaces and study areas.",
    year: "2023",
    type: "goal"
  },
  {
    id: 6,
    title: "Digital Transformation",
    description: "Implemented digital platforms for improved student services and communication.",
    year: "2023",
    type: "goal"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') as 'admin' | 'student' || 'student';
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem('userRole')) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleVoteClick = () => {
    navigate('/vote');
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <EventSlideshow />
          </div>
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-college-navy">
                Council Achievements
              </h2>
              {userRole === 'student' && (
                <Button 
                  onClick={handleVoteClick}
                  className="bg-college-navy hover:bg-college-navy/90"
                >
                  <Vote className="mr-2 h-4 w-4" />
                  Cast Your Vote
                </Button>
              )}
              {userRole === 'admin' && (
                <Button 
                  onClick={() => navigate('/analytics')}
                  className="bg-college-navy hover:bg-college-navy/90"
                >
                  View Analytics
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + achievement.id * 0.1, duration: 0.5 }}
                >
                  <AchievementCard achievement={achievement} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default Dashboard;
