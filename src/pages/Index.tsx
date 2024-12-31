import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TransformSection from "@/components/TransformSection";
import ServicesSection from "@/components/ServicesSection";
import FreeTrialSection from "@/components/FreeTrialSection";
import MembershipSection from "@/components/MembershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TransformSection />
      <ServicesSection />
      <GallerySection />
      <FreeTrialSection />
      <MembershipSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;