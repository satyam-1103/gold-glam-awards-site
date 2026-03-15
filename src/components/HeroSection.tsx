import { Star, Camera, Users, Music, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Star, label: "Red Carpet Entry" },
  { icon: Camera, label: "Media Coverage" },
  { icon: Users, label: "Brand Networking" },
  { icon: Music, label: "After Party & DJ Night" },
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-gold opacity-40 animate-float" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-gold opacity-30 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 rounded-full bg-gold opacity-50 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-gold opacity-20 animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Main Title */}
        <p className="text-primary font-sans uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-fade-in-up">
          Digitace Tech Solutions Presents
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 gradient-gold-text leading-tight">
          Influencer Awards
          <br />
          Night 2026
        </h1>
        <p className="text-foreground/80 text-lg md:text-2xl font-light mb-10 max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
          Celebrating the Power of Digital Creators
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button
            size="lg"
            className="gradient-gold text-primary-foreground font-semibold text-base px-8 py-6 rounded-full animate-pulse-gold hover:scale-105 transition-transform"
            onClick={() => scrollTo("influencer-form")}
          >
            Register as Influencer
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-base px-8 py-6 rounded-full transition-all"
            onClick={() => scrollTo("sponsor-form")}
          >
            Become a Sponsor
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-base px-8 py-6 rounded-full transition-all"
            onClick={() => scrollTo("vendor-form")}
          >
            Vendor Registration
          </Button>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
              <Icon className="w-6 h-6 text-primary" />
              <span className="text-foreground text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Organizer Info */}
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
          <p className="font-semibold text-foreground">Organized by Digitace Tech Solutions</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9205600437" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" /> 9205600437
            </a>
            <a href="https://www.digitacetechsolutions.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Globe className="w-3.5 h-3.5" /> www.digitacetechsolutions.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
