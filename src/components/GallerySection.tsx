import { ScrollReveal } from "@/components/ScrollReveal";
import { ImageIcon } from "lucide-react";

const GallerySection = () => (
  <section className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <ScrollReveal className="text-center mb-10">
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Moments</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
          Event <span className="gradient-gold-text">Gallery</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl aspect-square flex items-center justify-center group hover:border-primary/40 transition-colors">
            <div className="text-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2 group-hover:text-primary/50 transition-colors" />
              <p className="text-muted-foreground/50 text-sm font-medium">Coming Soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
