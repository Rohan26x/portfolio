import { GraduationCap, Brain, Code, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";

const highlights = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Predictive modeling & statistical analysis with Python, R, and Scikit-learn",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "React.js, Next.js, REST APIs, and modern web technologies",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "MySQL, PostgreSQL, ETL pipelines, and scalable data solutions",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Oracle certified AI professional with a passion for emerging tech",
  },
];

const AboutSection = () => {
  const { data } = usePortfolio();
  const { profile, education } = data;

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transforming Data into Impact
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a Data Science student at <span className="text-foreground font-medium">{education.institution}</span> with 
                expertise in statistical analysis, machine learning, and data visualization. My passion lies in 
                extracting actionable insights from complex datasets and building scalable solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With experience as an <span className="text-foreground font-medium">AI Trainer at Outlier</span>, I've contributed to 
                improving large language models through adversarial prompt engineering and RLHF workflows. 
                I thrive on solving real-world problems with data-driven approaches.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-card px-4 py-2 rounded-lg border border-border">
                  <span className="text-primary font-bold text-xl">{profile.cgpa}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ 10 CGPA</span>
                </div>
                <div className="bg-card px-4 py-2 rounded-lg border border-border">
                  <span className="text-primary font-bold text-xl">{profile.aiTrainingDuration}</span>
                  <span className="text-muted-foreground text-sm ml-1">months AI Training</span>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">
                      {education.degree}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {education.specialization}
                    </p>
                    <p className="text-muted-foreground">
                      {education.institution}
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      {education.duration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Highlight Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
