import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TransformSection from "@/components/TransformSection";
import ServicesSection from "@/components/ServicesSection";
import FreeTrialSection from "@/components/FreeTrialSection";
import MembershipSection from "@/components/MembershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TransformSection />
      <ServicesSection />
      <FreeTrialSection />
      <MembershipSection />
      <TestimonialsSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;