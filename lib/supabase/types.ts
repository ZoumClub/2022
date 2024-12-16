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
      accessories: {
        Row: {
          id: string
          name: string
          price: number
          description: string | null
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          description?: string | null
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          description?: string | null
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table definitions here
    }
    Functions: {
      [key: string]: unknown
    }
    Enums: {
      [key: string]: unknown
    }
  }
}