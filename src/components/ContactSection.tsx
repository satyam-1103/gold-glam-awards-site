import { Phone, Globe, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

const ContactSection = () => (
  <section id="contact" className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-2xl text-center">
      <ScrollReveal>
        <p className="text-primary font-sans uppercase tracking-widest text-sm mb-3">Get in Touch</p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-10">
          Contact <span className="gradient-gold-text">Us</span>
        </h2>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <h3 className="font-serif text-xl font-bold text-foreground">Digitace Tech Solutions Pvt. Ltd.</h3>

          <div className="space-y-4 text-left max-w-sm mx-auto">
            <a href="tel:9205600437" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span>9205600437</span>
            </a>
            <a href="https://www.digitacetechsolutions.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Globe className="w-5 h-5 text-primary flex-shrink-0" />
              <span>www.digitacetechsolutions.com</span>
            </a>
          </div>

          <a
            href={`https://wa.me/919205600437?text=${encodeURIComponent("Hi, I'm interested in the Influencer Awards Night 2026!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gradient-gold text-primary-foreground font-semibold px-8 py-6 rounded-full mt-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default ContactSection;
