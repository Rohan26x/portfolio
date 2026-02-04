import { Briefcase, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ExperienceSection = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Professional Background</p>
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {data.experiences.map((experience, index) => (
              <Card key={index} className="bg-background border-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-primary/50" />
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Briefcase className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{experience.title}</h3>
                      <p className="text-primary font-medium">{experience.company}</p>
                      <p className="text-muted-foreground text-sm">
                        {experience.type} • {experience.duration}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {experience.responsibilities.map((item, respIndex) => (
                      <div key={respIndex} className="flex gap-3">
                        <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
                        <p className="text-muted-foreground leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;