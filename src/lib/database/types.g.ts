export type Json =
  | { [key: string]: Json | undefined } |
  boolean |
  Json[] |
  null |
  number |
  string;

export type Database = {
  graphql_public: {
    CompositeTypes: {
      [_ in never]: never
    };
    Functions: {
      graphql: {
        Returns: Json;
        Args: {
          query?: string;
          variables?: Json;
          extensions?: Json;
          operationName?: string;
        };
      };
    };
    Enums: {
      [_ in never]: never
    };
    Tables: {
      [_ in never]: never
    };
    Views: {
      [_ in never]: never
    };
  };
  public: {
    CompositeTypes: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
    Enums: {
      sport_icon:
        | 'icon_bike' |
        'icon_row' |
        'icon_run' |
        'icon_shoe' |
        'icon_sky' |
        'icon_swim';
    };
    Tables: {
      closet_items: {
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'closet_items_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'profiles';
          }
        ];
        Row: {
          brand: null | string;
          created_at: string;
          id: string;
          is_archived: boolean;
          material: null | string;
          name: string;
          size: null | string;
          type: string;
          updated_at: string;
          user_id: string;
          color: null | string;
          notes: null | string;
          sport_types: null | string[];
          weather_conditions: null | string[];
        };
        Insert: {
          name: string;
          type: string;
          user_id: string;
          brand?: null | string;
          created_at?: string;
          id?: string;
          is_archived?: boolean;
          material?: null | string;
          size?: null | string;
          updated_at?: string;
          color?: null | string;
          notes?: null | string;
          sport_types?: null | string[];
          weather_conditions?: null | string[];
        };
        Update: {
          brand?: null | string;
          created_at?: string;
          id?: string;
          is_archived?: boolean;
          material?: null | string;
          name?: string;
          size?: null | string;
          type?: string;
          updated_at?: string;
          user_id?: string;
          color?: null | string;
          notes?: null | string;
          sport_types?: null | string[];
          weather_conditions?: null | string[];
        };
      };
      gear_categories: {
        Relationships: [
          {
            columns: ['sport_id'];
            foreignKeyName: 'gear_categories_sport_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sports';
          }
        ];
        Row: {
          created_at: string;
          id: string;
          key: string;
          sport_id: string;
        };
        Insert: {
          key: string;
          sport_id: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          sport_id?: string;
        };
      };
      profiles: {
        Relationships: [
          {
            columns: ['primary_sport_id'];
            foreignKeyName: 'profiles_primary_sport_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sports';
          }
        ];
        Row: {
          created_at: string;
          first_name: null | string;
          id: string;
          last_name: null | string;
          updated_at: string;
          primary_sport_id: null | string;
        };
        Insert: {
          id: string;
          created_at?: string;
          first_name?: null | string;
          last_name?: null | string;
          updated_at?: string;
          primary_sport_id?: null | string;
        };
        Update: {
          created_at?: string;
          first_name?: null | string;
          id?: string;
          last_name?: null | string;
          updated_at?: string;
          primary_sport_id?: null | string;
        };
      };
      sports: {
        Relationships: [];
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          key: string;
          slug: string;
          icon: Database['public']['Enums']['sport_icon'];
        };
        Insert: {
          key: string;
          slug: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          icon?: Database['public']['Enums']['sport_icon'];
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          key?: string;
          slug?: string;
          icon?: Database['public']['Enums']['sport_icon'];
        };
      };
      user_sports: {
        Relationships: [
          {
            columns: ['user_id'];
            foreignKeyName: 'sports_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'profiles';
          },
          {
            columns: ['sport_id'];
            foreignKeyName: 'user_sports_sport_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'sports';
          }
        ];
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
          user_id: string;
          sport_id: string;
        };
        Insert: {
          name: string;
          slug: string;
          user_id: string;
          sport_id: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
          user_id?: string;
          sport_id?: string;
        };
      };
      activities: {
        Relationships: [
          {
            columns: ['setup_id'];
            foreignKeyName: 'activities_setup_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'setups';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'activities_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'profiles';
          }
        ];
        Row: {
          created_at: string;
          date: string;
          distance_km: null | number;
          id: string;
          name: string;
          setup_id: null | string;
          updated_at: string;
          user_id: string;
          duration_hours: null | number;
          notes: null | string;
        };
        Insert: {
          date: string;
          name: string;
          user_id: string;
          created_at?: string;
          distance_km?: null | number;
          id?: string;
          setup_id?: null | string;
          updated_at?: string;
          duration_hours?: null | number;
          notes?: null | string;
        };
        Update: {
          created_at?: string;
          date?: string;
          distance_km?: null | number;
          id?: string;
          name?: string;
          setup_id?: null | string;
          updated_at?: string;
          user_id?: string;
          duration_hours?: null | number;
          notes?: null | string;
        };
      };
      activity_gear_usage: {
        Relationships: [
          {
            columns: ['activity_id'];
            foreignKeyName: 'activity_gear_usage_activity_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'activities';
          },
          {
            columns: ['gear_item_id'];
            foreignKeyName: 'activity_gear_usage_gear_item_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'gear_items';
          }
        ];
        Row: {
          activity_id: string;
          created_at: string;
          gear_item_id: string;
          id: string;
          usage_amount: number;
        };
        Insert: {
          activity_id: string;
          gear_item_id: string;
          usage_amount: number;
          created_at?: string;
          id?: string;
        };
        Update: {
          activity_id?: string;
          created_at?: string;
          gear_item_id?: string;
          id?: string;
          usage_amount?: number;
        };
      };
      gear_items: {
        Relationships: [
          {
            columns: ['category_id'];
            foreignKeyName: 'gear_items_category_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'gear_categories';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'gear_items_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'profiles';
          }
        ];
        Row: {
          brand: null | string;
          created_at: string;
          current_usage: number;
          id: string;
          is_archived: boolean;
          max_usage: null | number;
          name: string;
          purchase_date: null | string;
          purchase_price: null | number;
          tracking_unit: string;
          updated_at: string;
          user_id: string;
          category_id: string;
          description: null | string;
          model: null | string;
        };
        Insert: {
          name: string;
          user_id: string;
          category_id: string;
          brand?: null | string;
          created_at?: string;
          current_usage?: number;
          id?: string;
          is_archived?: boolean;
          max_usage?: null | number;
          purchase_date?: null | string;
          purchase_price?: null | number;
          tracking_unit?: string;
          updated_at?: string;
          description?: null | string;
          model?: null | string;
        };
        Update: {
          brand?: null | string;
          created_at?: string;
          current_usage?: number;
          id?: string;
          is_archived?: boolean;
          max_usage?: null | number;
          name?: string;
          purchase_date?: null | string;
          purchase_price?: null | number;
          tracking_unit?: string;
          updated_at?: string;
          user_id?: string;
          category_id?: string;
          description?: null | string;
          model?: null | string;
        };
      };
      setup_gear: {
        Relationships: [
          {
            columns: ['gear_item_id'];
            foreignKeyName: 'setup_gear_gear_item_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'gear_items';
          },
          {
            columns: ['setup_id'];
            foreignKeyName: 'setup_gear_setup_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'setups';
          }
        ];
        Row: {
          created_at: string;
          gear_item_id: string;
          setup_id: string;
        };
        Insert: {
          gear_item_id: string;
          setup_id: string;
          created_at?: string;
        };
        Update: {
          created_at?: string;
          gear_item_id?: string;
          setup_id?: string;
        };
      };
      setups: {
        Relationships: [
          {
            columns: ['user_sport_id'];
            foreignKeyName: 'setups_sport_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'user_sports';
          }
        ];
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
          description: null | string;
          user_sport_id: string;
        };
        Insert: {
          name: string;
          slug: string;
          user_sport_id: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
          description?: null | string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
          description?: null | string;
          user_sport_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | { schema: keyof Database } |
  keyof (DefaultSchema['Tables'] & DefaultSchema['Views']),
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
    Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
      ? R
      : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
    DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | { schema: keyof Database } |
  keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I;
  }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | { schema: keyof Database } |
  keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U;
  }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | { schema: keyof Database } |
  keyof DefaultSchema['Enums'],
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | { schema: keyof Database } |
  keyof DefaultSchema['CompositeTypes'],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {}
  },
  public: {
    Enums: {
      sport_icon: [
        'icon_bike',
        'icon_run',
        'icon_shoe',
        'icon_swim',
        'icon_row',
        'icon_sky'
      ]
    }
  }
} as const;

