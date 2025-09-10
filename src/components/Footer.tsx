import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles
      gsap.to('.footer-particle', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'power1.inOut'
      });

      // Footer content animation
      gsap.fromTo('.footer-content', {
        opacity: 0,
        y: 60,
        filter: 'blur(5px)'
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 bg-secondary/50 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="footer-content text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trung Loyal
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Web Developer crafting digital experiences with passion and precision.
            </p>
          </div>

          <div className="flex justify-center space-x-8">
            <button className="text-muted-foreground hover:text-primary transition-colors">About</button>
            <button className="text-muted-foreground hover:text-primary transition-colors">Projects</button>
            <button className="text-muted-foreground hover:text-primary transition-colors">Contact</button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" className="w-10 h-10 glass-card flex items-center justify-center text-muted-foreground hover:text-neon-cyan transition-all duration-300 hover:scale-110">
              <i className="ph-github-logo ph-light text-xl"></i>
            </a>
            <a href="#" className="w-10 h-10 glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
              <i className="ph-linkedin-logo ph-light text-xl"></i>
            </a>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2024 Trung Loyal. Built with React, GSAP & Spring Boot.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};