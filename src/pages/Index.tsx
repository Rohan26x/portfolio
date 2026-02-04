import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingContactButton from "@/components/FloatingContactButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <CertificationsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ContactSection />
      </ScrollReveal>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Index;
