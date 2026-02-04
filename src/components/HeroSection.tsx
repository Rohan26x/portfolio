import { Github, Linkedin, Mail, MapPin, Phone, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/PortfolioContext";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with dark overlay - stays dark in both themes */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-hero/90" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content - always light text on dark background */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider">
            {profile.title}
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-hero-foreground mb-6 tracking-tight">
            {profile.name}
          </h1>
          
          <p className="text-lg md:text-xl text-hero-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            {profile.tagline}
          </p>

          {/* Location & Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 text-hero-muted">
            <span className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-primary" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-primary" />
              {profile.email}
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary" />
              {profile.phone}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Button 
              variant="default" 
              size="lg" 
              className="group"
              asChild
            >
              <a href="#projects">
                View Projects
                <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-hero-border text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
              asChild
            >
              <a href="/resume/RohanPatel.pdf" download="Rohan_Patel_Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-hero-border text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hero-muted hover:text-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hero-muted hover:text-primary transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-hero-muted" size={28} />
      </div>
    </section>
  );
};

export default HeroSection;