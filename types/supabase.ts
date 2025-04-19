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
      profiles: {
        Row: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string
          email?: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string
          email?: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          avatar_url?: string
          email?: string
          user_id?: string
        }
      }
      typing_sessions: {
        Row: {
          id: string
          user_id: string
          wpm: number
          accuracy: number
          duration_seconds: number
          created_at?: string
        }
        Insert: {
          id?: string
          user_id: string
          wpm: number
          accuracy: number
          duration_seconds: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wpm?: number
          accuracy?: number
          duration_seconds?: number
          created_at?: string
        }
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
  }
} 