import { useState } from "react";
import { CATEGORY_GROUPS, SPECIAL_AWARDS, TIERS } from "@/lib/categories";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Trophy, Crown } from "lucide-react";

const AwardCategories = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="categories" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-14">
          <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Recognition</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
            Award <span className="gradient-gold-text">Categories</span>
          </h2>
        </ScrollReveal>

        {/* Tier Legend */}
        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-10">
          {TIERS.map((t) => (
            <span key={t.label} className="glass-card text-xs md:text-sm px-3 py-1.5 rounded-full text-muted-foreground">
              {t.label}: <span className="text-primary">{t.range}</span>
            </span>
          ))}
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORY_GROUPS.map((g, i) => (
            <button
              key={g.title}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === i
                  ? "gradient-gold text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* Active Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
          {CATEGORY_GROUPS[activeTab].categories.map((cat) => (
            <div key={cat} className="glass-card rounded-xl p-5 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                <h3 className="font-serif text-base font-semibold text-foreground">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TIERS.map((t) => (
                  <span key={t.label} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Special Awards */}
        <ScrollReveal className="text-center mb-8">
          <h3 className="font-serif text-2xl md:text-3xl font-bold gradient-gold-text inline-flex items-center gap-2">
            <Crown className="w-7 h-7 text-primary" /> Special Awards
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {SPECIAL_AWARDS.map((award) => (
            <div key={award} className="glass-card rounded-xl p-5 text-center border border-primary/30 hover:border-primary/60 transition-colors">
              <Crown className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-serif text-sm md:text-base font-semibold text-foreground">{award}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardCategories;
