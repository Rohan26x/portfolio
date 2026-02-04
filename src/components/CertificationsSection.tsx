import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";

const CertificationsSection = () => {
  const { data } = usePortfolio();

  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Credentials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certifications & Languages
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Certifications */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Award className="text-primary" size={20} />
                Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.certifications.map((cert, index) => (
                  <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-card-foreground mb-1">{cert.title}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-primary font-mono">{cert.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Languages</h3>
              <div className="space-y-4">
                {data.languages.map((lang, index) => (
                  <div 
                    key={index}
                    className="bg-card p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{lang.name}</span>
                      <span className="text-sm text-primary">{lang.level}</span>
                    </div>
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

export default CertificationsSection;
