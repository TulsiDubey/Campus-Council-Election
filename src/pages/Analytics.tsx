
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import ResultsChart from '@/components/analytics/ResultsChart';
import VotingStats from '@/components/analytics/VotingStats';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data - This would come from your Supabase database
const mockResults = {
  president: [
    { name: 'Alex Johnson', votes: 152, position: 'President' },
    { name: 'Priya Sharma', votes: 187, position: 'President' },
    { name: 'Michael Chen', votes: 95, position: 'President' }
  ],
  vicePresident: [
    { name: 'Sarah Williams', votes: 134, position: 'Vice President' },
    { name: 'Arjun Reddy', votes: 201, position: 'Vice President' },
    { name: 'Emma Thompson', votes: 99, position: 'Vice President' }
  ],
  culturalSecretary: [
    { name: 'David Wilson', votes: 167, position: 'Cultural Secretary' },
    { name: 'Riya Patel', votes: 142, position: 'Cultural Secretary' },
    { name: 'Kevin Zhang', votes: 125, position: 'Cultural Secretary' }
  ],
  sportsSecretary: [
    { name: 'James Rodriguez', votes: 193, position: 'Sports Secretary' },
    { name: 'Ananya Singh', votes: 112, position: 'Sports Secretary' },
    { name: 'Brandon Lee', votes: 129, position: 'Sports Secretary' }
  ],
  ladiesRepresentative: [
    { name: 'Sofia Martinez', votes: 176, position: 'Ladies Representative' },
    { name: 'Nina Dasgupta', votes: 143, position: 'Ladies Representative' },
    { name: 'Tara Johnson', votes: 115, position: 'Ladies Representative' }
  ]
};

const totalVoters = 500;
const votesSubmitted = 434;
const timeRemaining = '2 days';

const Analytics = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') as 'admin' | 'student' || 'student';
  const { toast } = useToast();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem('userRole')) {
      navigate('/');
      return;
    }
    
    // For students, redirect to dashboard
    if (userRole === 'student') {
      navigate('/dashboard');
    }
  }, [navigate, userRole]);
  
  const handleExportResults = () => {
    // In a real app, you'd generate and download a CSV/PDF here
    toast({
      title: "Results exported",
      description: "Election results have been downloaded as a CSV file.",
    });
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-college-navy">Election Analytics</h1>
              <p className="text-gray-600 mt-2">
                Real-time results and voting statistics
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-college-navy text-college-navy hover:bg-college-navy hover:text-white"
              onClick={handleExportResults}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
          
          <VotingStats 
            totalVoters={totalVoters}
            votesSubmitted={votesSubmitted}
            timeRemaining={timeRemaining}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResultsChart data={mockResults.president} position="President" />
            <ResultsChart data={mockResults.vicePresident} position="Vice President" />
            <ResultsChart data={mockResults.culturalSecretary} position="Joint Cultural Secretary" />
            <ResultsChart data={mockResults.sportsSecretary} position="Joint Sports Secretary" />
            <div className="lg:col-span-2">
              <ResultsChart data={mockResults.ladiesRepresentative} position="Ladies Representative" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Analytics;
