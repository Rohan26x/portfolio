import { Github, Linkedin, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Footer = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {profile.name}. Built with passion.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <Link
              to="/admin"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Admin Dashboard"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
