export interface FreeTrialFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export interface FreeTrialBooking extends FreeTrialFormData {
  verification_code: string;
  is_verified: boolean;
  created_at?: string;
  id?: string;
}