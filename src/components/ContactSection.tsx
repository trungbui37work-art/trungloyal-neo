import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title', {
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

      // Form inputs animation from left
      gsap.fromTo('.form-input', {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
        }
      });

      // Social icons animation
      gsap.fromTo('.social-icon', {
        opacity: 0,
        scale: 0.5
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 80%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyl2Fi8q5JafssUQgR8JfqYgd1Xujk8DbTjkmGYhN2s1noJU4f1JMzENHELmVyE5WM9fA/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Network error");

      const result = await response.json();
      console.log("✅ Lưu thành công:", result);

      toast({
        title: "Message Sent!",
        description: "Your message has been saved. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("❌ Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; // <-- Dấu đóng hàm handleSubmit ở đây

  // ----- PHẦN CODE GIẢ LẬP ĐÃ BỊ XÓA BỎ -----

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'ph-github-logo', url: 'https://github.com', color: 'hover:text-neon-cyan' },
    { name: 'LinkedIn', icon: 'ph-linkedin-logo', url: 'https://linkedin.com', color: 'hover:text-primary' },
    { name: 'Email', icon: 'ph-envelope', url: 'mailto:trungloyal@example.com', color: 'hover:text-accent' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="contact-title text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-input space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="glass bg-secondary/50 border-border/50 focus:border-primary focus:glow-primary transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-input space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="glass bg-secondary/50 border-border/50 focus:border-primary focus:glow-primary transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-input space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  rows={6}
                  className="glass bg-secondary/50 border-border/50 focus:border-primary focus:glow-primary transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold py-3 glow-primary disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <i className="ph-paper-plane-tilt ph-bold ml-2"></i>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let's Connect
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <i className="ph-envelope ph-light text-2xl text-primary"></i>
                  <span>trungloyal@example.com</span>
                </div>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <i className="ph-map-pin ph-light text-2xl text-primary"></i>
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <i className="ph-clock ph-light text-2xl text-primary"></i>
                  <span>Available for freelance work</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Follow Me
              </h3>
              
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-12 h-12 glass-card flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <i className={`${social.icon} ph-light text-2xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6 border border-primary/20">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Currently Available
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm currently accepting new projects and freelance opportunities. 
                Whether you need a full-stack web application, a modern frontend, 
                or backend API development, I'd love to help bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
