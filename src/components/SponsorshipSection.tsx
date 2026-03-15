import { Download, Gem, Award, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

const packages = [
  { icon: Gem, title: "Title Sponsor", desc: "Maximum brand visibility, logo on all media, stage naming rights, exclusive VIP section, and first right of refusal.", highlight: true },
  { icon: Award, title: "Gold Sponsor", desc: "Premium placement, logo on banners & digital media, 2 award presentations, and VIP access for 10 guests." },
  { icon: Star, title: "Category Sponsor", desc: "Sponsor a specific award category, on-stage brand mention, logo on category materials, and 5 VIP passes." },
  { icon: Heart, title: "Supporting Sponsor", desc: "Logo on event materials, social media mentions, and 3 VIP passes to the event." },
];

const SponsorshipSection = () => (
  <section id="sponsorship" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <ScrollReveal className="text-center mb-14">
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Partner With Us</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
          Sponsorship <span className="gradient-gold-text">Opportunities</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        {packages.map(({ icon: Icon, title, desc, highlight }) => (
          <ScrollReveal key={title}>
            <div className={`glass-card rounded-xl p-6 h-full ${highlight ? "border border-primary/50 relative overflow-hidden" : ""}`}>
              {highlight && <div className="absolute top-0 right-0 gradient-gold text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">PREMIUM</div>}
              <Icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="gradient-gold text-primary-foreground font-semibold text-base px-10 py-6 rounded-full"
          onClick={() => {
            // Placeholder - link to actual PDF
            window.open("#", "_blank");
          }}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Sponsor Deck (PDF)
        </Button>
      </div>
    </div>
  </section>
);

export default SponsorshipSection;
