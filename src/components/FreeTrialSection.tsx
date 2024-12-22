import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FreeTrialFormData, FreeTrialBooking } from "@/types/free-trial";
import RegistrationForm from "./free-trial/RegistrationForm";
import VerificationForm from "./free-trial/VerificationForm";

const FreeTrialSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FreeTrialFormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
      return;
    }

    if (!showVerification) {
      const code = generateVerificationCode();
      setGeneratedCode(code);
      setShowVerification(true);
      
      toast({
        title: "Verification Code Sent",
        description: `Your verification code is: ${code}`,
      });
      return;
    }

    if (verificationCode !== generatedCode) {
      toast({
        title: "Invalid Code",
        description: "Please enter the correct verification code",
        variant: "destructive",
      });
      return;
    }

    try {
      const booking: Database['public']['Tables']['free_trial_bookings']['Insert'] = {
        ...formData,
        verification_code: verificationCode,
        is_verified: true
      };

      const { error } = await supabase
        .from('free_trial_bookings')
        .insert([booking]);

      if (error) throw error;

      toast({
        title: "Free Trial Booked!",
        description: "We'll contact you shortly to confirm your trial session.",
      });
      
      setFormData({ name: "", email: "", phone: "", gender: "" });
      setVerificationCode("");
      setShowVerification(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book your trial. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="free-trial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-4xl font-bold text-black mb-6 relative">
              Book a Free Two-Day Trial and Experience Our Gym!
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-muscle-red"></span>
            </h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
                <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
                Meet Our Expert Trainers
              </li>
              <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
                <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
                Explore Our State-of-the-Art Facilities
              </li>
              <li className="flex items-center text-gray-600 hover:text-muscle-red transition-colors">
                <span className="w-2 h-2 bg-muscle-red rounded-full mr-3"></span>
                Join Exciting Group Classes
              </li>
            </ul>
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Trainer with client"
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-up"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg animate-fade-up">
            {!showVerification ? (
              <RegistrationForm formData={formData} onChange={handleChange} />
            ) : (
              <VerificationForm 
                verificationCode={verificationCode}
                onVerificationChange={setVerificationCode}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-muscle-red hover:bg-muscle-red/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {showVerification ? "Verify & Book Trial" : "Get Verification Code"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;