import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.projects-title', {
        opacity: 0,
        y: 50,
        filter: 'blur(5px)'
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Project cards animation with stagger
      gsap.fromTo('.project-card', {
        opacity: 0,
        scale: 0.8,
        y: 100
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with Java Spring Boot backend and React frontend",
      tech: ["Java", "Spring Boot", "React", "MySQL"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates and team collaboration",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Modern portfolio with 3D animations and smooth scrolling effects",
      tech: ["React", "GSAP", "Spline", "Tailwind"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather tracking with beautiful data visualizations",
      tech: ["Vue.js", "Chart.js", "API", "CSS"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 5,
      title: "Social Media API",
      description: "RESTful API for social media platform with authentication and file uploads",
      tech: ["Spring Boot", "JWT", "PostgreSQL", "AWS"],
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Business intelligence dashboard with interactive charts and real-time data",
      tech: ["React", "D3.js", "Python", "Flask"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      link: "#"
    }
  ];

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      y: -10,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="projects-title text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring modern web applications 
            built with cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" ref={scrollContainerRef}>
          {/* Desktop: Horizontal scrolling layout */}
          <div className="hidden lg:flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card flex-shrink-0 w-96 glass-card group cursor-pointer"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-primary"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View Project
                    <i className="ph-external-link ph-bold ml-2"></i>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Stacked layout */}
          <div className="lg:hidden grid gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card glass-card group cursor-pointer"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 glow-primary"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    View Project
                    <i className="ph-external-link ph-bold ml-2"></i>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};