const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold gradient-gold-text mb-3">Influencer Awards Night</h3>
            <p className="text-muted-foreground text-sm">Celebrating the Power of Digital Creators</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "About", id: "about" },
                { label: "Categories", id: "categories" },
                { label: "Register", id: "influencer-form" },
                { label: "Sponsor", id: "sponsor-form" },
                { label: "Contact", id: "contact" },
              ].map(l => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="hover:text-primary transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Terms of Participation</span></li>
            </ul>
            <div className="flex gap-3 mt-4">
              {["Instagram", "Twitter", "LinkedIn", "YouTube"].map(s => (
                <span key={s} className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-sm">© 2026 Digitace Tech Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
