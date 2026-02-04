import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolio();

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Featured Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Projects That Make an Impact
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Projects Grid */}
          <motion.div 
            ref={ref}
            className="grid gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {data.projects.map((project, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card 
                  className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <CardHeader className="lg:col-span-2 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-primary font-mono text-sm mb-2">{project.date}</p>
                          <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.demo && (
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              title="Live Demo"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              title="GitHub Repository"
                            >
                              <Github size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="border-border text-muted-foreground"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 bg-muted/20 flex flex-col justify-center">
                      <p className="text-sm font-medium text-foreground mb-4">Key Metrics</p>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button variant="outline" size="lg" asChild>
              <a
                href={data.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github size={20} />
                View More on GitHub
                <ExternalLink size={16} />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
