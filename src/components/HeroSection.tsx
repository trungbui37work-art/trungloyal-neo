import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main hero animation timeline
      const tl = gsap.timeline({ delay: 1 });
      
      // Headline animation with blur effect
      tl.fromTo('.hero-headline', {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      });

      // Subtitle animation
      tl.fromTo('.hero-subtitle', {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');

      // CTA button animation
      tl.fromTo('.hero-cta', {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');

      // Spline iframe animation
      tl.fromTo('.spline-container', {
        opacity: 0,
        x: 100
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=1');

      // Floating orbs animation
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          gsap.to(orb, {
            y: -20,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTAHover = () => {
    gsap.to('.hero-cta', {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCTALeave = () => {
    gsap.to('.hero-cta', {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background floating orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) orbsRef.current[i] = el; }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="hero-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-neon-cyan bg-clip-text text-transparent">
                Trung Loyal
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-foreground/80">
                Web Developer
              </span>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
          </div>

          <div className="hero-cta">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold px-8 py-4 text-lg glow-primary"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={handleCTAHover}
              onMouseLeave={handleCTALeave}
            >
              Hire Me
              <i className="ph-arrow-right ph-bold ml-2"></i>
            </Button>
          </div>
        </div>

        {/* Right side - 3D Spline Model */}
        <div className="spline-container relative h-96 lg:h-[600px] rounded-2xl overflow-hidden glass-card">
          <iframe 
            src='https://my.spline.design/themuseum-mwaXXRSwmdr3c8SxPPH4S0Bf/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="rounded-xl"
          />
          
          {/* Gradient overlay for better integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none rounded-xl"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </button>
      </div>
    </section>
  );
};