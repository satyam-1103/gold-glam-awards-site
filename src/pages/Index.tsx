import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import AwardCategories from "@/components/AwardCategories";
import InfluencerForm from "@/components/InfluencerForm";
import SponsorForm from "@/components/SponsorForm";
import SponsorshipSection from "@/components/SponsorshipSection";
import VendorForm from "@/components/VendorForm";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CountdownTimer />
      <AboutSection />
      <HighlightsSection />
      <AwardCategories />
      <InfluencerForm />
      <SponsorForm />
      <SponsorshipSection />
      <VendorForm />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
