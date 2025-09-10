import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the logo text
    tl.from('.preloader-text', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });

    // Progress bar animation
    tl.to('.progress-bar', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        setProgress(progress);
      },
      onComplete: () => {
        // Fade out preloader
        gsap.to('.preloader', {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }
    }, '-=0.5');

    // Floating particles animation
    gsap.to('.particle', {
      y: -100,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: 'power1.inOut'
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <div className="preloader-text mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TRUNG LOYAL
          </h1>
          <p className="text-muted-foreground text-lg mt-4 tracking-wider">
            WEB DEVELOPER
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-1 bg-secondary rounded-full mx-auto mb-4 overflow-hidden">
          <div className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full w-0 glow-primary"></div>
        </div>
        
        <div className="text-primary font-medium">
          {progress}%
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
    </div>
  );
};