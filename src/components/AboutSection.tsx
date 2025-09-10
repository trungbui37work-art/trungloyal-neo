import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePhoto from '@/assets/profile-photo.png';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in animation
      gsap.fromTo('.about-content', {
        opacity: 0,
        filter: 'blur(5px)',
        y: 50
      }, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Profile image animation
      gsap.fromTo('.profile-image', {
        opacity: 0,
        x: -100,
        rotation: -10
      }, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Skills animation with stagger
      gsap.fromTo('.skill-icon', {
        opacity: 0,
        scale: 0.5,
        y: 30
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageHover = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleImageLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const skills = [
    { name: 'HTML5', icon: 'ph-code' },
    { name: 'CSS3', icon: 'ph-paint-brush' },
    { name: 'JavaScript', icon: 'ph-lightning' },
    { name: 'Java', icon: 'ph-coffee' },
    { name: 'Spring Boot', icon: 'ph-leaf' },
    { name: 'GSAP', icon: 'ph-magic-wand' },
    { name: 'React', icon: 'ph-atom' },
    { name: 'Database', icon: 'ph-database' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div 
              ref={imageRef}
              className="profile-image relative"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              <div className="w-80 h-80 rounded-full overflow-hidden glass-card p-4 glow-primary">
                <img 
                  src={profilePhoto} 
                  alt="Trung Loyal - Web Developer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-accent to-neon-cyan rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="about-content space-y-8">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate web developer with expertise in creating modern, 
                  responsive, and user-friendly applications. With a strong foundation 
                  in both frontend and backend technologies, I bring ideas to life 
                  through clean code and innovative design.
                </p>
                
                <p>
                  Specializing in Java Spring Boot for robust backend solutions and 
                  modern JavaScript frameworks for dynamic user interfaces. I'm constantly 
                  exploring new technologies and animation libraries like GSAP to create 
                  engaging web experiences.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                Tech Stack
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon glass-card p-4 text-center group hover:glow-primary transition-all duration-300 cursor-pointer"
                  >
                    <i className={`${skill.icon} ph-light text-3xl text-primary group-hover:text-accent transition-colors mb-2`}></i>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};