import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar, AlertTriangle, Award, Leaf, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Calendar,
      title: 'Schedule Waste Pickups Easily',
      description: 'Book waste collection from your location in just a few taps. Never miss a pickup again!',
      illustration: 'https://images.unsplash.com/photo-1740635313618-35636018c870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMHRydWNrJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NjI1OTMwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-[#4CAF50] to-[#66BB6A]',
    },
    {
      icon: AlertTriangle,
      title: 'Report Waste Overflow Instantly',
      description: 'Alert authorities about overflowing bins and illegal dumping with just a photo.',
      illustration: 'https://images.unsplash.com/photo-1741565697191-be7da831643c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMGJpbiUyMG92ZXJmbG93fGVufDF8fHx8MTc2MjU5MzA0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-[#FFC107] to-[#FFD54F]',
    },
    {
      icon: Award,
      title: 'Recycle Right and Earn Rewards',
      description: 'Track your eco-impact, find recycling kiosks nearby, and earn points for a greener future.',
      illustration: 'https://images.unsplash.com/photo-1581081874314-cf94ae666228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBoYW5kcyUyMHN1c3RhaW5hYmlsaXR5fGVufDF8fHx8MTc2MjU5MzA0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      color: 'from-[#81C784] to-[#A5D6A7]',
    },
  ];

  const currentSlideData = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#F8FFF9] flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-[#1B5E20] hover:bg-[#E8F5E9]"
        >
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Illustration */}
        <div className={`w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br ${currentSlideData.color} p-8 mb-8 relative overflow-hidden shadow-xl animate-fadeIn`}>
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src={currentSlideData.illustration}
              alt={currentSlideData.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="w-40 h-40 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
              <currentSlideData.icon className="w-20 h-20 text-[#4CAF50]" />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 animate-float">
            <Leaf className="w-12 h-12 text-white/40" />
          </div>
          <div className="absolute bottom-12 left-8 animate-float" style={{ animationDelay: '0.5s' }}>
            <Leaf className="w-8 h-8 text-white/40" />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-md animate-fadeIn">
          <h2 className="text-[#1B5E20] mb-4">{currentSlideData.title}</h2>
          <p className="text-[#558B2F]">{currentSlideData.description}</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pb-8 px-6">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-[#4CAF50]' 
                  : 'w-2 bg-[#C8E6C9]'
              }`}
            />
          ))}
        </div>

        {/* Get Started Button */}
        <Button
          onClick={handleNext}
          className="w-full bg-[#4CAF50] hover:bg-[#66BB6A] text-white h-14 rounded-2xl shadow-lg"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            'Get Started 🌿'
          )}
        </Button>
      </div>
    </div>
  );
}
