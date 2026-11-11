import { useEffect } from 'react';
import { Leaf, Recycle } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50] via-[#66BB6A] to-[#81C784] flex items-center justify-center overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-float">
          <Leaf className="w-20 h-20 text-white" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <Recycle className="w-16 h-16 text-white" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="w-24 h-24 text-white" />
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
          <Recycle className="w-20 h-20 text-white" />
        </div>
      </div>

      {/* Logo & Text */}
      <div className="relative z-10 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-6 animate-pulse-eco">
          <Leaf className="w-16 h-16 text-[#4CAF50]" />
        </div>
        <h1 className="text-white text-5xl mb-3">ECO-VISION</h1>
        <p className="text-white/90 text-xl">Clean Future. Smart Waste.</p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
