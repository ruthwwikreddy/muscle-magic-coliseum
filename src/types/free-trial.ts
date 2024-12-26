export interface FreeTrialFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export interface FreeTrialBooking extends FreeTrialFormData {
  verification_code: string;
  is_verified: boolean | null;
  created_at?: string;
  id?: string;
}

// Add Database types for Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      free_trial_bookings: {
        Row: {
          created_at: string
          email: string
          gender: string
          id: string
          is_verified: boolean | null
          name: string
          phone: string
          verification_code: string
        }
        Insert: {
          created_at?: string
          email: string
          gender: string
          id?: string
          is_verified?: boolean | null
          name: string
          phone: string
          verification_code: string
        }
        Update: {
          created_at?: string
          email?: string
          gender?: string
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string
          verification_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}