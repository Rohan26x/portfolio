import { useState } from "react";
import { usePortfolio, Profile, Education, Skill, Project, Experience, Certification, Language } from "@/contexts/PortfolioContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Save, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { data, updateProfile, updateEducation, updateSkills, updateProjects, updateExperiences, updateCertifications, updateLanguages, resetToDefaults } = usePortfolio();
  const { toast } = useToast();

  // Local state for editing
  const [profile, setProfile] = useState<Profile>(data.profile);
  const [education, setEducation] = useState<Education>(data.education);
  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [experiences, setExperiences] = useState<Experience[]>(data.experiences);
  const [certifications, setCertifications] = useState<Certification[]>(data.certifications);
  const [languages, setLanguages] = useState<Language[]>(data.languages);

  const saveAll = () => {
    updateProfile(profile);
    updateEducation(education);
    updateSkills(skills);
    updateProjects(projects);
    updateExperiences(experiences);
    updateCertifications(certifications);
    updateLanguages(languages);
    toast({ title: "Changes saved!", description: "All portfolio data has been updated." });
  };

  const handleReset = () => {
    resetToDefaults();
    setProfile(data.profile);
    setEducation(data.education);
    setSkills(data.skills);
    setProjects(data.projects);
    setExperiences(data.experiences);
    setCertifications(data.certifications);
    setLanguages(data.languages);
    toast({ title: "Reset complete", description: "Portfolio data has been reset to defaults." });
  };

  // Skills handlers
  const addSkillCategory = () => setSkills([...skills, { title: "New Category", skills: [] }]);
  const removeSkillCategory = (index: number) => setSkills(skills.filter((_, i) => i !== index));
  const updateSkillCategory = (index: number, field: keyof Skill, value: string | string[]) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };
  const addSkillToCategory = (catIndex: number, skill: string) => {
    if (!skill.trim()) return;
    const updated = [...skills];
    updated[catIndex].skills = [...updated[catIndex].skills, skill.trim()];
    setSkills(updated);
  };
  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[catIndex].skills = updated[catIndex].skills.filter((_, i) => i !== skillIndex);
    setSkills(updated);
  };

  // Projects handlers
  const addProject = () => setProjects([...projects, { title: "New Project", description: "", tech: [], highlights: [], date: "", github: "", demo: "" }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));
  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  // Experiences handlers
  const addExperience = () => setExperiences([...experiences, { title: "", company: "", type: "", duration: "", responsibilities: [] }]);
  const removeExperience = (index: number) => setExperiences(experiences.filter((_, i) => i !== index));
  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };
  const addResponsibility = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities = [...updated[expIndex].responsibilities, ""];
    setExperiences(updated);
  };
  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities = updated[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    setExperiences(updated);
  };
  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const updated = [...experiences];
    updated[expIndex].responsibilities[respIndex] = value;
    setExperiences(updated);
  };

  // Certifications handlers
  const addCertification = () => setCertifications([...certifications, { title: "", issuer: "", date: "" }]);
  const removeCertification = (index: number) => setCertifications(certifications.filter((_, i) => i !== index));
  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCertifications(updated);
  };

  // Languages handlers
  const addLanguage = () => setLanguages([...languages, { name: "", level: "" }]);
  const removeLanguage = (index: number) => setLanguages(languages.filter((_, i) => i !== index));
  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/"><ArrowLeft size={20} /></Link>
            </Button>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
            <Button onClick={saveAll}>
              <Save size={16} className="mr-2" />
              Save All
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Tagline</Label>
                  <Textarea value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>CGPA</Label>
                  <Input value={profile.cgpa} onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>AI Training Duration (months)</Label>
                  <Input value={profile.aiTrainingDuration} onChange={(e) => setProfile({ ...profile, aiTrainingDuration: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            {skills.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <Input 
                    value={category.title} 
                    onChange={(e) => updateSkillCategory(catIndex, "title", e.target.value)}
                    className="text-lg font-semibold w-auto"
                  />
                  <Button variant="destructive" size="icon" onClick={() => removeSkillCategory(catIndex)}>
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="gap-1 pr-1">
                        {skill}
                        <button onClick={() => removeSkillFromCategory(catIndex, skillIndex)} className="ml-1 hover:text-destructive">×</button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a skill..." 
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addSkillToCategory(catIndex, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addSkillCategory} className="w-full">
              <Plus size={16} className="mr-2" /> Add Skill Category
            </Button>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <Input value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} placeholder="Project title" />
                    <Input value={project.date} onChange={(e) => updateProject(index, "date", e.target.value)} placeholder="Date (e.g., Jul - Nov 2024)" />
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeProject(index)}>
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input 
                      value={project.tech.join(", ")} 
                      onChange={(e) => updateProject(index, "tech", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlights (comma-separated)</Label>
                    <Input 
                      value={project.highlights.join(", ")} 
                      onChange={(e) => updateProject(index, "highlights", e.target.value.split(",").map(h => h.trim()).filter(Boolean))} 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>GitHub Repository URL</Label>
                      <Input 
                        value={project.github || ""} 
                        onChange={(e) => updateProject(index, "github", e.target.value)} 
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Live Demo URL</Label>
                      <Input 
                        value={project.demo || ""} 
                        onChange={(e) => updateProject(index, "demo", e.target.value)} 
                        placeholder="https://your-demo-site.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addProject} className="w-full">
              <Plus size={16} className="mr-2" /> Add Project
            </Button>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            {experiences.map((exp, expIndex) => (
              <Card key={expIndex}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <CardTitle className="text-lg">Experience {expIndex + 1}</CardTitle>
                  <Button variant="destructive" size="icon" onClick={() => removeExperience(expIndex)}>
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input value={exp.title} onChange={(e) => updateExperience(expIndex, "title", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input value={exp.company} onChange={(e) => updateExperience(expIndex, "company", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input value={exp.type} onChange={(e) => updateExperience(expIndex, "type", e.target.value)} placeholder="Full-time, Part-time, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input value={exp.duration} onChange={(e) => updateExperience(expIndex, "duration", e.target.value)} placeholder="e.g., Jan 2023 - Present" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Responsibilities</Label>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <div key={respIndex} className="flex gap-2">
                        <Textarea value={resp} onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)} className="min-h-[60px]" />
                        <Button variant="destructive" size="icon" onClick={() => removeResponsibility(expIndex, respIndex)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => addResponsibility(expIndex)} className="w-full">
                      <Plus size={16} className="mr-2" /> Add Responsibility
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addExperience} className="w-full">
              <Plus size={16} className="mr-2" /> Add Work Experience
            </Button>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 grid gap-4 md:grid-cols-3">
                      <Input value={cert.title} onChange={(e) => updateCertification(index, "title", e.target.value)} placeholder="Certification title" />
                      <Input value={cert.issuer} onChange={(e) => updateCertification(index, "issuer", e.target.value)} placeholder="Issuer" />
                      <Input value={cert.date} onChange={(e) => updateCertification(index, "date", e.target.value)} placeholder="Date" />
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeCertification(index)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addCertification} className="w-full">
              <Plus size={16} className="mr-2" /> Add Certification
            </Button>
          </TabsContent>

          {/* Languages Tab */}
          <TabsContent value="languages" className="space-y-4">
            {languages.map((lang, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 grid gap-4 md:grid-cols-2">
                      <Input value={lang.name} onChange={(e) => updateLanguage(index, "name", e.target.value)} placeholder="Language name" />
                      <Input value={lang.level} onChange={(e) => updateLanguage(index, "level", e.target.value)} placeholder="Proficiency level" />
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeLanguage(index)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addLanguage} className="w-full">
              <Plus size={16} className="mr-2" /> Add Language
            </Button>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input value={education.specialization} onChange={(e) => setEducation({ ...education, specialization: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input value={education.institution} onChange={(e) => setEducation({ ...education, institution: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={education.duration} onChange={(e) => setEducation({ ...education, duration: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;