import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav items on mount
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power2.out'
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="nav-item">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              TL
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-item text-foreground/80 hover:text-foreground transition-colors hover:glow-primary px-4 py-2 rounded-lg"
              >
                {item}
              </button>
            ))}
            
            <Button 
              onClick={() => scrollToSection('contact')}
              className="nav-item bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-primary"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden nav-item flex flex-col w-6 h-6 justify-center items-center"
          >
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex items-center justify-center opacity-0 -translate-y-5">
          <div className="text-center space-y-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block text-3xl font-light text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
            
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-primary mt-8"
            >
              Hire Me
            </Button>
          </div>
        </div>
      )}
    </>
  );
};