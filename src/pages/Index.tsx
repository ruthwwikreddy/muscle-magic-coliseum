import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TransformSection from "@/components/TransformSection";
import ServicesSection from "@/components/ServicesSection";
import MembershipSection from "@/components/MembershipSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TransformSection />
      <ServicesSection />
      <MembershipSection />
      <ContactSection />
    </div>
  );
};

export default Index;