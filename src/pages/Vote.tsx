
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import CandidateCard from '@/components/voting/CandidateCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Candidate, CandidatePosition, Vote } from '@/types/elections';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data - This would come from your Supabase database
const candidatesData: Candidate[] = [
  // President candidates
  {
    id: 'p1',
    name: 'Alex Johnson',
    position: 'president',
    description: 'Computer Science, 3rd year. Experience in student leadership.',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 'p2',
    name: 'Priya Sharma',
    position: 'president',
    description: 'Electronics Engineering, 4th year. Former class representative.',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'p3',
    name: 'Michael Chen',
    position: 'president',
    description: 'Mechanical Engineering, 3rd year. Active in multiple clubs.',
    photoUrl: 'https://randomuser.me/api/portraits/men/86.jpg'
  },
  
  // Vice President candidates
  {
    id: 'vp1',
    name: 'Sarah Williams',
    position: 'vicePresident',
    description: 'Information Technology, 3rd year. Tech club coordinator.',
    photoUrl: 'https://randomuser.me/api/portraits/women/67.jpg'
  },
  {
    id: 'vp2',
    name: 'Arjun Reddy',
    position: 'vicePresident',
    description: 'Civil Engineering, 4th year. Project management experience.',
    photoUrl: 'https://randomuser.me/api/portraits/men/94.jpg'
  },
  {
    id: 'vp3',
    name: 'Emma Thompson',
    position: 'vicePresident',
    description: 'Computer Engineering, 3rd year. Previous council member.',
    photoUrl: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
  
  // Cultural Secretary candidates
  {
    id: 'cs1',
    name: 'David Wilson',
    position: 'culturalSecretary',
    description: 'Arts & Design, 2nd year. Organized multiple cultural events.',
    photoUrl: 'https://randomuser.me/api/portraits/men/29.jpg'
  },
  {
    id: 'cs2',
    name: 'Riya Patel',
    position: 'culturalSecretary',
    description: 'Literature, 3rd year. Dance club lead and event organizer.',
    photoUrl: 'https://randomuser.me/api/portraits/women/14.jpg'
  },
  {
    id: 'cs3',
    name: 'Kevin Zhang',
    position: 'culturalSecretary',
    description: 'Media Studies, 2nd year. Music band president.',
    photoUrl: 'https://randomuser.me/api/portraits/men/42.jpg'
  },
  
  // Sports Secretary candidates
  {
    id: 'ss1',
    name: 'James Rodriguez',
    position: 'sportsSecretary',
    description: 'Sports Science, 3rd year. College basketball team captain.',
    photoUrl: 'https://randomuser.me/api/portraits/men/55.jpg'
  },
  {
    id: 'ss2',
    name: 'Ananya Singh',
    position: 'sportsSecretary',
    description: 'Electrical Engineering, 4th year. Inter-college sports coordinator.',
    photoUrl: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: 'ss3',
    name: 'Brandon Lee',
    position: 'sportsSecretary',
    description: 'Mechanical Engineering, 3rd year. Athletics team leader.',
    photoUrl: 'https://randomuser.me/api/portraits/men/33.jpg'
  },
  
  // Ladies Representative candidates
  {
    id: 'lr1',
    name: 'Sofia Martinez',
    position: 'ladiesRepresentative',
    description: 'Psychology, 4th year. Women\'s welfare coordinator.',
    photoUrl: 'https://randomuser.me/api/portraits/women/75.jpg'
  },
  {
    id: 'lr2',
    name: 'Nina Dasgupta',
    position: 'ladiesRepresentative',
    description: 'Computer Science, 2nd year. Women in tech advocate.',
    photoUrl: 'https://randomuser.me/api/portraits/women/26.jpg'
  },
  {
    id: 'lr3',
    name: 'Tara Johnson',
    position: 'ladiesRepresentative',
    description: 'Business Administration, 3rd year. Gender equality club lead.',
    photoUrl: 'https://randomuser.me/api/portraits/women/31.jpg'
  }
];

const Vote = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userRole = localStorage.getItem('userRole') as 'admin' | 'student' || 'student';
  const userEmail = localStorage.getItem('userEmail') || '';
  
  const [selectedCandidates, setSelectedCandidates] = useState<Record<CandidatePosition, string | null>>({
    president: null,
    vicePresident: null,
    culturalSecretary: null,
    sportsSecretary: null,
    ladiesRepresentative: null
  });
  
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!localStorage.getItem('userRole')) {
      navigate('/');
      return;
    }
    
    // Check if user has already voted
    const hasUserVoted = localStorage.getItem('hasVoted') === 'true';
    setHasVoted(hasUserVoted);
    
    // For admin, redirect to analytics
    if (userRole === 'admin') {
      navigate('/analytics');
    }
  }, [navigate, userRole]);
  
  const handleSelectCandidate = (position: CandidatePosition, candidateId: string) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };
  
  const handleSubmitVote = async () => {
    // Check if all positions have been voted for
    const hasAllSelections = Object.values(selectedCandidates).every(Boolean);
    
    if (!hasAllSelections) {
      toast({
        title: "Incomplete selection",
        description: "Please select one candidate for each position",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would save this to Supabase
    // For now we'll simulate an API call
    setTimeout(() => {
      // Store the vote
      const vote: Vote = {
        userId: userEmail,
        ...selectedCandidates,
        timestamp: new Date()
      };
      
      console.log('Vote submitted:', vote);
      
      // Save to local storage to track that the user has voted
      localStorage.setItem('hasVoted', 'true');
      
      setIsSubmitting(false);
      setHasVoted(true);
      
      toast({
        title: "Vote submitted successfully",
        description: "Thank you for participating in the campus elections",
      });
    }, 1500);
  };
  
  const getCandidatesByPosition = (position: CandidatePosition): Candidate[] => {
    return candidatesData.filter(c => c.position === position);
  };

  if (hasVoted) {
    return (
      <>
        <Navbar userRole={userRole} />
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="container mx-auto px-4 py-12 max-w-3xl"
        >
          <Alert variant="default" className="bg-green-50 border-green-200 mb-8">
            <CheckCircle className="h-4 w-4 text-green-700" />
            <AlertTitle className="text-green-800">Thank you for voting!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your vote has been recorded. The results will be announced after the election closes.
            </AlertDescription>
          </Alert>
          
          <div className="text-center my-8">
            <h1 className="text-2xl font-bold text-college-navy">Your vote matters!</h1>
            <p className="mt-2 text-gray-600">
              The campus council election results will be announced soon.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="mt-6 bg-college-navy hover:bg-college-navy/90"
            >
              Return to Dashboard
            </Button>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Navbar userRole={userRole} />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-college-navy">Cast Your Vote</h1>
          <p className="text-gray-600 mt-2">
            Select one candidate for each position. Your vote is confidential.
          </p>
          
          <Alert variant="default" className="bg-blue-50 border-blue-200 mt-4 mb-8">
            <AlertCircle className="h-4 w-4 text-blue-700" />
            <AlertTitle className="text-blue-800">Important</AlertTitle>
            <AlertDescription className="text-blue-700">
              You can only vote once. Please review your choices carefully before submitting.
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* President */}
          <CandidateCard 
            position="President"
            candidates={getCandidatesByPosition('president')}
            selectedCandidate={selectedCandidates.president}
            onSelect={(id) => handleSelectCandidate('president', id)}
          />
          
          {/* Vice President */}
          <CandidateCard 
            position="Vice President"
            candidates={getCandidatesByPosition('vicePresident')}
            selectedCandidate={selectedCandidates.vicePresident}
            onSelect={(id) => handleSelectCandidate('vicePresident', id)}
          />
          
          {/* Cultural Secretary */}
          <CandidateCard 
            position="Joint Cultural Secretary"
            candidates={getCandidatesByPosition('culturalSecretary')}
            selectedCandidate={selectedCandidates.culturalSecretary}
            onSelect={(id) => handleSelectCandidate('culturalSecretary', id)}
          />
          
          {/* Sports Secretary */}
          <CandidateCard 
            position="Joint Sports Secretary"
            candidates={getCandidatesByPosition('sportsSecretary')}
            selectedCandidate={selectedCandidates.sportsSecretary}
            onSelect={(id) => handleSelectCandidate('sportsSecretary', id)}
          />
          
          {/* Ladies Representative */}
          <CandidateCard 
            position="Ladies Representative"
            candidates={getCandidatesByPosition('ladiesRepresentative')}
            selectedCandidate={selectedCandidates.ladiesRepresentative}
            onSelect={(id) => handleSelectCandidate('ladiesRepresentative', id)}
          />
          
          <div className="mt-8 flex justify-end">
            <Button 
              className="bg-college-navy hover:bg-college-navy/90 px-8 py-2 text-lg"
              onClick={handleSubmitVote}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Your Vote"}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Vote;
