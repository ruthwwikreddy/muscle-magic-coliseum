import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FreeTrialFormData } from "@/types/free-trial";
import RegistrationForm from "./free-trial/RegistrationForm";
import VerificationForm from "./free-trial/VerificationForm";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Upload } from "lucide-react";

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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
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

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!showVerification) {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setShowAuth(true);
        return;
      }

      const code = generateVerificationCode();
      setGeneratedCode(code);
      setShowVerification(true);
      
      toast({
        title: "Verification Codes Sent",
        description: `Your verification code is: ${code} (sent to both phone and email)`,
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
      let imagePath = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const filePath = `${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('free-trial-images')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;
        imagePath = filePath;
      }

      const booking = {
        ...formData,
        verification_code: verificationCode,
        is_verified: true,
        image_url: imagePath
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
      setIsEmailVerified(false);
      setSelectedImage(null);
      setImageUrl(null);
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

  if (showAuth) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Please Sign In to Continue</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          onlyThirdPartyProviders={false}
        />
      </div>
    );
  }

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
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Selected preview"
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-up"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Trainer with client"
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-up"
              />
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg animate-fade-up">
            {!showVerification ? (
              <>
                <RegistrationForm formData={formData} onChange={handleChange} />
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Your Photo
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-muscle-red transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-muscle-red hover:text-muscle-red/90">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </>
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