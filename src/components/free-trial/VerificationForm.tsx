import { Button } from "../ui/button";

interface VerificationFormProps {
  verificationCode: string;
  onVerificationChange: (code: string) => void;
}

const VerificationForm = ({ verificationCode, onVerificationChange }: VerificationFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Verify Your Phone Number</h3>
      <p className="text-sm text-gray-600">
        We've sent a verification code to your phone number. Please enter it below.
      </p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Verification Code
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => onVerificationChange(e.target.value)}
          required
          maxLength={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-muscle-red focus:border-muscle-red transition-all duration-300 hover:border-muscle-red"
          placeholder="Enter 4-digit code"
        />
      </div>
    </div>
  );
};

export default VerificationForm;