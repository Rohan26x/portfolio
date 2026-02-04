import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ContactSection = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: profile.github,
      username: `@${profile.github.split("/").pop()}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile.linkedin,
      username: `@${profile.linkedin.split("/").pop()}`,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              I'm always open to discussing new projects, opportunities, or just having a chat about data science and AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <method.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">{method.label}</p>
                      {method.href ? (
                        <a 
                          href={method.href}
                          className="font-medium text-white hover:text-primary transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="font-medium text-white">{method.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                          <social.icon className="text-primary" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{social.label}</p>
                          <p className="text-sm text-white/60">{social.username}</p>
                        </div>
                      </div>
                      <Send className="text-white/40 group-hover:text-primary transition-colors" size={18} />
                    </CardContent>
                  </Card>
                </a>
              ))}
              
              {/* CTA */}
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="mr-2" size={18} />
                    Send Me an Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;