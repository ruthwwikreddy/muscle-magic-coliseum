import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FreeTrialSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('free_trial_bookings')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Free Trial Booked!",
        description: "We'll contact you shortly to confirm your trial session.",
      });
      
      setFormData({ name: "", email: "", phone: "", gender: "" });
    } catch (error) {
      console.error('Error booking free trial:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your free trial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter a valid 10-digit Indian mobile number</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-muscle-red hover:bg-muscle-red/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Your Free Trial Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;