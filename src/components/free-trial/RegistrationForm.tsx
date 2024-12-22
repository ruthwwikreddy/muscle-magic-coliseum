import { Phone } from "lucide-react";
import { FreeTrialFormData } from "@/types/free-trial";

interface RegistrationFormProps {
  formData: FreeTrialFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const RegistrationForm = ({ formData, onChange }: RegistrationFormProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </>
  );
};

export default RegistrationForm;