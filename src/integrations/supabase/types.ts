export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      assessment_sessions: {
        Row: {
          big_five_answers: Json | null
          big_five_scores: Json | null
          career_results: Json | null
          city: string | null
          completed_at: string | null
          country: string | null
          country_code: string | null
          created_at: string
          current_step: string | null
          device_id: string | null
          higher_order_scores: Json | null
          id: string
          major_results: Json | null
          region: string | null
          riasec_answers: Json | null
          riasec_scores: Json | null
          school_id: string | null
          session_secret: string | null
          top_riasec_codes: string[] | null
          updated_at: string
          user_id: string | null
          value_scores: Json | null
          values_answers: Json | null
        }
        Insert: {
          big_five_answers?: Json | null
          big_five_scores?: Json | null
          career_results?: Json | null
          city?: string | null
          completed_at?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          current_step?: string | null
          device_id?: string | null
          higher_order_scores?: Json | null
          id?: string
          major_results?: Json | null
          region?: string | null
          riasec_answers?: Json | null
          riasec_scores?: Json | null
          school_id?: string | null
          session_secret?: string | null
          top_riasec_codes?: string[] | null
          updated_at?: string
          user_id?: string | null
          value_scores?: Json | null
          values_answers?: Json | null
        }
        Update: {
          big_five_answers?: Json | null
          big_five_scores?: Json | null
          career_results?: Json | null
          city?: string | null
          completed_at?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          current_step?: string | null
          device_id?: string | null
          higher_order_scores?: Json | null
          id?: string
          major_results?: Json | null
          region?: string | null
          riasec_answers?: Json | null
          riasec_scores?: Json | null
          school_id?: string | null
          session_secret?: string | null
          top_riasec_codes?: string[] | null
          updated_at?: string
          user_id?: string | null
          value_scores?: Json | null
          values_answers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      pakistan_programs: {
        Row: {
          admission_deadline: string | null
          city: string
          created_at: string | null
          degree: string | null
          department: string | null
          duration: string | null
          eligibility_criteria: string | null
          fee_structure: number | null
          id: string
          program: string | null
          program_url: string | null
          test_required: string | null
          university_name: string
        }
        Insert: {
          admission_deadline?: string | null
          city: string
          created_at?: string | null
          degree?: string | null
          department?: string | null
          duration?: string | null
          eligibility_criteria?: string | null
          fee_structure?: number | null
          id?: string
          program?: string | null
          program_url?: string | null
          test_required?: string | null
          university_name: string
        }
        Update: {
          admission_deadline?: string | null
          city?: string
          created_at?: string | null
          degree?: string | null
          department?: string | null
          duration?: string | null
          eligibility_criteria?: string | null
          fee_structure?: number | null
          id?: string
          program?: string | null
          program_url?: string | null
          test_required?: string | null
          university_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          school_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          school_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          school_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      university_matches: {
        Row: {
          created_at: string
          id: string
          preferences: Json
          school_id: string | null
          score: number
          tier: string
          university_country: string
          university_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preferences?: Json
          school_id?: string | null
          score: number
          tier: string
          university_country: string
          university_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preferences?: Json
          school_id?: string | null
          score?: number
          tier?: string
          university_country?: string
          university_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "university_matches_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity: {
        Row: {
          created_at: string
          id: string
          prediction: string | null
          questions: Json
          school_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prediction?: string | null
          questions?: Json
          school_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prediction?: string | null
          questions?: Json
          school_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          school_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          school_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          school_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      assessment_sessions_safe: {
        Row: {
          big_five_answers: Json | null
          big_five_scores: Json | null
          career_results: Json | null
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          device_id: string | null
          higher_order_scores: Json | null
          id: string | null
          major_results: Json | null
          riasec_answers: Json | null
          riasec_scores: Json | null
          session_secret: string | null
          top_riasec_codes: string[] | null
          updated_at: string | null
          user_id: string | null
          value_scores: Json | null
          values_answers: Json | null
        }
        Insert: {
          big_five_answers?: Json | null
          big_five_scores?: Json | null
          career_results?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          device_id?: string | null
          higher_order_scores?: Json | null
          id?: string | null
          major_results?: Json | null
          riasec_answers?: Json | null
          riasec_scores?: Json | null
          session_secret?: string | null
          top_riasec_codes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          value_scores?: Json | null
          values_answers?: Json | null
        }
        Update: {
          big_five_answers?: Json | null
          big_five_scores?: Json | null
          career_results?: Json | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          device_id?: string | null
          higher_order_scores?: Json | null
          id?: string | null
          major_results?: Json | null
          riasec_answers?: Json | null
          riasec_scores?: Json | null
          session_secret?: string | null
          top_riasec_codes?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          value_scores?: Json | null
          values_answers?: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_school_students: {
        Args: { p_school_id: string }
        Returns: {
          assessments_completed: number
          assessments_in_progress: number
          email: string
          full_name: string
          joined_at: string
          last_activity: string
          university_matches_count: number
          user_id: string
        }[]
      }
      get_student_details: {
        Args: { p_school_id: string; p_student_id: string }
        Returns: Json
      }
      get_user_school_id: { Args: { _user_id: string }; Returns: string }
      get_user_session: {
        Args: { p_device_id: string; p_session_secret: string }
        Returns: {
          big_five_answers: Json
          big_five_scores: Json
          career_results: Json
          completed_at: string
          created_at: string
          current_step: string
          device_id: string
          higher_order_scores: Json
          id: string
          major_results: Json
          riasec_answers: Json
          riasec_scores: Json
          session_secret: string
          top_riasec_codes: string[]
          updated_at: string
          user_id: string
          value_scores: Json
          values_answers: Json
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      join_school_by_code: { Args: { p_school_code: string }; Returns: Json }
    }
    Enums: {
      app_role: "student" | "school_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "school_admin"],
    },
  },
} as const
