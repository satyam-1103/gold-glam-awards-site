import { Users, Building2, Newspaper, Briefcase } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const pillars = [
  { icon: Users, title: "Influencers", desc: "Top content creators across niches" },
  { icon: Building2, title: "Brands", desc: "Leading brands seeking partnerships" },
  { icon: Newspaper, title: "Media", desc: "Press & media coverage partners" },
  { icon: Briefcase, title: "Entrepreneurs", desc: "Visionary business leaders" },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">About the Event</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
          Where <span className="gradient-gold-text">Creativity</span> Meets Recognition
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Influencer Awards Night 2026 is a premium event celebrating content creators across fashion,
          lifestyle, travel, food, fitness, and digital industries. The event brings together influencers,
          brands, media, and entrepreneurs for recognition, networking, and collaboration.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        {pillars.map(({ icon: Icon, title, desc }) => (
          <ScrollReveal key={title}>
            <div className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform group">
              <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-gold">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
