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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      advertisements: {
        Row: {
          content: string
          destination_url: string | null
          device: string
          ends_at: string | null
          id: string
          is_active: boolean
          name: string
          placement: string
          priority: number
          starts_at: string | null
        }
        Insert: {
          content: string
          destination_url?: string | null
          device?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          placement: string
          priority?: number
          starts_at?: string | null
        }
        Update: {
          content?: string
          destination_url?: string | null
          device?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          placement?: string
          priority?: number
          starts_at?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          published_at: string | null
          read_minutes: number
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Insert: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          published_at?: string | null
          read_minutes?: number
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          published_at?: string | null
          read_minutes?: number
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          details: Json
          entity_id: string | null
          entity_type: string
          id: number
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type: string
          id?: never
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type?: string
          id?: never
        }
        Relationships: []
      }
      feedback: {
        Row: {
          attachment_url: string | null
          category: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          reference: string
          status: Database["public"]["Enums"]["feedback_status"]
          subject: string
          whatsapp: string | null
        }
        Insert: {
          attachment_url?: string | null
          category: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          reference: string
          status?: Database["public"]["Enums"]["feedback_status"]
          subject: string
          whatsapp?: string | null
        }
        Update: {
          attachment_url?: string | null
          category?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          reference?: string
          status?: Database["public"]["Enums"]["feedback_status"]
          subject?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          id: string
          is_active: boolean
          label: string
          new_tab: boolean
          parent_id: string | null
          sort_order: number
          url: string
        }
        Insert: {
          id?: string
          is_active?: boolean
          label: string
          new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          url: string
        }
        Update: {
          id?: string
          is_active?: boolean
          label?: string
          new_tab?: boolean
          parent_id?: string | null
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          content: Json
          heading: string | null
          id: string
          is_active: boolean
          page_slug: string
          section_type: string
          sort_order: number
        }
        Insert: {
          content?: Json
          heading?: string | null
          id?: string
          is_active?: boolean
          page_slug: string
          section_type: string
          sort_order?: number
        }
        Update: {
          content?: Json
          heading?: string | null
          id?: string
          is_active?: boolean
          page_slug?: string
          section_type?: string
          sort_order?: number
        }
        Relationships: []
      }
      prediction_categories: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      predictions: {
        Row: {
          analysis: string
          away_team: string
          category_id: string | null
          confidence: number
          created_at: string
          home_team: string
          id: string
          is_featured: boolean
          kickoff: string
          league: string
          market: string
          odds: number
          selection: string
          slug: string
          status: Database["public"]["Enums"]["prediction_status"]
          updated_at: string
          venue: string | null
        }
        Insert: {
          analysis?: string
          away_team: string
          category_id?: string | null
          confidence?: number
          created_at?: string
          home_team: string
          id?: string
          is_featured?: boolean
          kickoff: string
          league: string
          market: string
          odds: number
          selection: string
          slug: string
          status?: Database["public"]["Enums"]["prediction_status"]
          updated_at?: string
          venue?: string | null
        }
        Update: {
          analysis?: string
          away_team?: string
          category_id?: string | null
          confidence?: number
          created_at?: string
          home_team?: string
          id?: string
          is_featured?: boolean
          kickoff?: string
          league?: string
          market?: string
          odds?: number
          selection?: string
          slug?: string
          status?: Database["public"]["Enums"]["prediction_status"]
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "prediction_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          membership_status: string
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          membership_status?: string
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          membership_status?: string
          phone?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          is_public?: boolean
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vip_packages: {
        Row: {
          benefits: string[]
          currency: string
          description: string
          duration_days: number
          id: string
          is_active: boolean
          name: string
          price: number
          slug: string
          sort_order: number
        }
        Insert: {
          benefits?: string[]
          currency?: string
          description?: string
          duration_days: number
          id?: string
          is_active?: boolean
          name: string
          price: number
          slug: string
          sort_order?: number
        }
        Update: {
          benefits?: string[]
          currency?: string
          description?: string
          duration_days?: number
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      vip_requests: {
        Row: {
          created_at: string
          id: string
          message: string
          package_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string
          package_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          package_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vip_requests_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "vip_packages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_site_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "content_admin"
        | "support_admin"
        | "prediction_analyst"
      content_status: "draft" | "published" | "archived"
      feedback_status: "new" | "open" | "in_progress" | "replied" | "closed"
      prediction_status:
        | "draft"
        | "published"
        | "pending"
        | "won"
        | "lost"
        | "void"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: [
        "super_admin",
        "content_admin",
        "support_admin",
        "prediction_analyst",
      ],
      content_status: ["draft", "published", "archived"],
      feedback_status: ["new", "open", "in_progress", "replied", "closed"],
      prediction_status: [
        "draft",
        "published",
        "pending",
        "won",
        "lost",
        "void",
      ],
    },
  },
} as const
