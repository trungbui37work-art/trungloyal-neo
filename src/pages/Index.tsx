import React, { useState, useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Add Inter font class to body
    document.body.className = 'font-sans';
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handleLoadingComplete} />}
      
      {!loading && (
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
