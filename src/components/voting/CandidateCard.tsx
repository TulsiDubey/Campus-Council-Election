
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Candidate } from '@/types/elections';

interface CandidateCardProps {
  candidates: Candidate[];
  position: string;
  selectedCandidate: string | null;
  onSelect: (candidateId: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidates, 
  position,
  selectedCandidate,
  onSelect
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="bg-college-navy text-white">
        <CardTitle className="text-xl">{position}</CardTitle>
        <CardDescription className="text-white/70">
          Select one candidate for this position
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup value={selectedCandidate || ''} onValueChange={onSelect}>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center space-x-4 py-3 border-b last:border-0">
              <RadioGroupItem id={candidate.id} value={candidate.id} />
              <div className="flex flex-1 items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                  <AvatarFallback className="bg-college-gold text-college-navy">
                    {candidate.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor={candidate.id} className="text-base font-medium cursor-pointer">
                    {candidate.name}
                  </Label>
                  <p className="text-sm text-gray-500">{candidate.description}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
