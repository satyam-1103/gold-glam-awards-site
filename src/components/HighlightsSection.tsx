import { Star, Award, Camera, Mic, Users, Music } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const highlights = [
  { icon: Star, title: "Red Carpet Entry" },
  { icon: Award, title: "Award Ceremony" },
  { icon: Camera, title: "Professional Photography" },
  { icon: Mic, title: "Influencer Interviews" },
  { icon: Users, title: "Brand Networking" },
  { icon: Music, title: "DJ Night After Party" },
];

const HighlightsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <ScrollReveal className="text-center mb-14">
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">What to Expect</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
          Event <span className="gradient-gold-text">Highlights</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
        {highlights.map(({ icon: Icon, title }) => (
          <ScrollReveal key={title}>
            <div className="glass-card rounded-xl p-6 md:p-8 text-center shimmer hover:scale-105 transition-transform">
              <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-base md:text-lg font-semibold text-foreground">{title}</h3>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HighlightsSection;
