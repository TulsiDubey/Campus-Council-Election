
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const events = [
  {
    id: 1,
    title: "Annual Tech Symposium 2023",
    description: "Our flagship technology conference with over 500 participants and industry experts sharing insights on AI and blockchain technologies.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 2,
    title: "Cultural Festival - Harmony",
    description: "A vibrant showcase of art, music and dance performances celebrating cultural diversity across campus.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 3,
    title: "Sports Tournament 2023",
    description: "Inter-department sports competition featuring cricket, basketball, and athletics with record participation.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 4,
    title: "Leadership Summit",
    description: "Renowned speakers and workshops focused on developing leadership skills and professional growth.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 5,
    title: "Green Campus Initiative",
    description: "Student-led sustainability project that succeeded in reducing campus carbon footprint by 15%.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=400"
  }
];

const EventSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg bg-gray-100">
        {events.map((event, index) => (
          <div 
            key={event.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out transform",
              index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            )}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-sm md:text-base opacity-90">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
        {events.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventSlideshow;
