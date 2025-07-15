/* THIS FILE IS AUTO-GENERATED. DO NOT EDIT IT. */

import * as v from 'valibot';

export const SportIconSchema = v.picklist(['icon_bike', 'icon_row', 'icon_run', 'icon_shoe', 'icon_sky', 'icon_swim']);

export const ClosetItemsSchema = v.object({
  brand: v.nullable(v.string()),
  color: v.nullable(v.string()),
  created_at: v.string(),
  id: v.string(),
  is_archived: v.boolean(),
  material: v.nullable(v.string()),
  name: v.string(),
  notes: v.nullable(v.string()),
  size: v.nullable(v.string()),
  sport_types: v.nullable(v.unknown()),
  type: v.string(),
  updated_at: v.string(),
  user_id: v.string(),
  weather_conditions: v.nullable(v.unknown())
});
export type ClosetItemsSchemaType = v.InferOutput<typeof ClosetItemsSchema>;

export const ClosetItemsInsertSchema = v.object({
  brand: v.optional(v.nullable(v.string())),
  color: v.optional(v.nullable(v.string())),
  created_at: v.optional(v.string()),
  is_archived: v.optional(v.boolean()),
  material: v.optional(v.nullable(v.string())),
  name: v.string(),
  notes: v.optional(v.nullable(v.string())),
  size: v.optional(v.nullable(v.string())),
  sport_types: v.optional(v.nullable(v.unknown())),
  type: v.string(),
  updated_at: v.optional(v.string()),
  user_id: v.string(),
  weather_conditions: v.optional(v.nullable(v.unknown()))
});
export type ClosetItemsInsertSchemaType = v.InferOutput<typeof ClosetItemsInsertSchema>;

export const ClosetItemsUpdateSchema = v.object({
  brand: v.optional(v.nullable(v.string())),
  color: v.optional(v.nullable(v.string())),
  created_at: v.optional(v.string()),
  id: v.optional(v.string()),
  is_archived: v.optional(v.boolean()),
  material: v.optional(v.nullable(v.string())),
  name: v.optional(v.string()),
  notes: v.optional(v.nullable(v.string())),
  size: v.optional(v.nullable(v.string())),
  sport_types: v.optional(v.nullable(v.unknown())),
  type: v.optional(v.string()),
  updated_at: v.optional(v.string()),
  user_id: v.optional(v.string()),
  weather_conditions: v.optional(v.nullable(v.unknown()))
});
export type ClosetItemsUpdateSchemaType = v.InferOutput<typeof ClosetItemsUpdateSchema>;

export const GearCategoriesSchema = v.object({
  created_at: v.string(),
  id: v.string(),
  key: v.string(),
  sport_id: v.string()
});
export type GearCategoriesSchemaType = v.InferOutput<typeof GearCategoriesSchema>;

export const GearCategoriesInsertSchema = v.object({
  created_at: v.optional(v.string()),
  key: v.string(),
  sport_id: v.string()
});
export type GearCategoriesInsertSchemaType = v.InferOutput<typeof GearCategoriesInsertSchema>;

export const GearCategoriesUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  id: v.optional(v.string()),
  key: v.optional(v.string()),
  sport_id: v.optional(v.string())
});
export type GearCategoriesUpdateSchemaType = v.InferOutput<typeof GearCategoriesUpdateSchema>;

export const ProfilesSchema = v.object({
  created_at: v.string(),
  first_name: v.nullable(v.string()),
  id: v.string(),
  last_name: v.nullable(v.string()),
  primary_sport_id: v.nullable(v.string()),
  updated_at: v.string()
});
export type ProfilesSchemaType = v.InferOutput<typeof ProfilesSchema>;

export const ProfilesInsertSchema = v.object({
  created_at: v.optional(v.string()),
  first_name: v.optional(v.nullable(v.string())),
  last_name: v.optional(v.nullable(v.string())),
  primary_sport_id: v.optional(v.nullable(v.string())),
  updated_at: v.optional(v.string())
});
export type ProfilesInsertSchemaType = v.InferOutput<typeof ProfilesInsertSchema>;

export const ProfilesUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  first_name: v.optional(v.nullable(v.string())),
  id: v.optional(v.string()),
  last_name: v.optional(v.nullable(v.string())),
  primary_sport_id: v.optional(v.nullable(v.string())),
  updated_at: v.optional(v.string())
});
export type ProfilesUpdateSchemaType = v.InferOutput<typeof ProfilesUpdateSchema>;

export const SportsSchema = v.object({
  created_at: v.string(),
  icon: SportIconSchema,
  id: v.string(),
  is_active: v.boolean(),
  key: v.string()
});
export type SportsSchemaType = v.InferOutput<typeof SportsSchema>;

export const SportsInsertSchema = v.object({
  created_at: v.optional(v.string()),
  icon: v.optional(SportIconSchema),
  is_active: v.optional(v.boolean()),
  key: v.string()
});
export type SportsInsertSchemaType = v.InferOutput<typeof SportsInsertSchema>;

export const SportsUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  icon: v.optional(SportIconSchema),
  id: v.optional(v.string()),
  is_active: v.optional(v.boolean()),
  key: v.optional(v.string())
});
export type SportsUpdateSchemaType = v.InferOutput<typeof SportsUpdateSchema>;

export const UserSportsSchema = v.object({
  created_at: v.string(),
  id: v.string(),
  name: v.string(),
  sport_id: v.string(),
  updated_at: v.string(),
  user_id: v.string()
});
export type UserSportsSchemaType = v.InferOutput<typeof UserSportsSchema>;

export const UserSportsInsertSchema = v.object({
  created_at: v.optional(v.string()),
  name: v.string(),
  sport_id: v.string(),
  updated_at: v.optional(v.string()),
  user_id: v.string()
});
export type UserSportsInsertSchemaType = v.InferOutput<typeof UserSportsInsertSchema>;

export const UserSportsUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  sport_id: v.optional(v.string()),
  updated_at: v.optional(v.string()),
  user_id: v.optional(v.string())
});
export type UserSportsUpdateSchemaType = v.InferOutput<typeof UserSportsUpdateSchema>;

export const ActivitiesSchema = v.object({
  created_at: v.string(),
  date: v.string(),
  distance_km: v.nullable(v.number()),
  duration_hours: v.nullable(v.number()),
  id: v.string(),
  name: v.string(),
  notes: v.nullable(v.string()),
  setup_id: v.nullable(v.string()),
  updated_at: v.string(),
  user_id: v.string()
});
export type ActivitiesSchemaType = v.InferOutput<typeof ActivitiesSchema>;

export const ActivitiesInsertSchema = v.object({
  created_at: v.optional(v.string()),
  date: v.string(),
  distance_km: v.optional(v.nullable(v.number())),
  duration_hours: v.optional(v.nullable(v.number())),
  name: v.string(),
  notes: v.optional(v.nullable(v.string())),
  setup_id: v.optional(v.nullable(v.string())),
  updated_at: v.optional(v.string()),
  user_id: v.string()
});
export type ActivitiesInsertSchemaType = v.InferOutput<typeof ActivitiesInsertSchema>;

export const ActivitiesUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  date: v.optional(v.string()),
  distance_km: v.optional(v.nullable(v.number())),
  duration_hours: v.optional(v.nullable(v.number())),
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  notes: v.optional(v.nullable(v.string())),
  setup_id: v.optional(v.nullable(v.string())),
  updated_at: v.optional(v.string()),
  user_id: v.optional(v.string())
});
export type ActivitiesUpdateSchemaType = v.InferOutput<typeof ActivitiesUpdateSchema>;

export const ActivityGearUsageSchema = v.object({
  activity_id: v.string(),
  created_at: v.string(),
  gear_item_id: v.string(),
  id: v.string(),
  usage_amount: v.number()
});
export type ActivityGearUsageSchemaType = v.InferOutput<typeof ActivityGearUsageSchema>;

export const ActivityGearUsageInsertSchema = v.object({
  activity_id: v.string(),
  created_at: v.optional(v.string()),
  gear_item_id: v.string(),
  usage_amount: v.number()
});
export type ActivityGearUsageInsertSchemaType = v.InferOutput<typeof ActivityGearUsageInsertSchema>;

export const ActivityGearUsageUpdateSchema = v.object({
  activity_id: v.optional(v.string()),
  created_at: v.optional(v.string()),
  gear_item_id: v.optional(v.string()),
  id: v.optional(v.string()),
  usage_amount: v.optional(v.number())
});
export type ActivityGearUsageUpdateSchemaType = v.InferOutput<typeof ActivityGearUsageUpdateSchema>;

export const GearItemsSchema = v.object({
  brand: v.nullable(v.string()),
  category_id: v.string(),
  created_at: v.string(),
  current_usage: v.number(),
  description: v.nullable(v.string()),
  id: v.string(),
  is_archived: v.boolean(),
  max_usage: v.nullable(v.number()),
  model: v.nullable(v.string()),
  name: v.string(),
  purchase_date: v.nullable(v.string()),
  purchase_price: v.nullable(v.number()),
  tracking_unit: v.string(),
  updated_at: v.string(),
  user_id: v.string()
});
export type GearItemsSchemaType = v.InferOutput<typeof GearItemsSchema>;

export const GearItemsInsertSchema = v.object({
  brand: v.optional(v.nullable(v.string())),
  category_id: v.string(),
  created_at: v.optional(v.string()),
  current_usage: v.optional(v.number()),
  description: v.optional(v.nullable(v.string())),
  is_archived: v.optional(v.boolean()),
  max_usage: v.optional(v.nullable(v.number())),
  model: v.optional(v.nullable(v.string())),
  name: v.string(),
  purchase_date: v.optional(v.nullable(v.string())),
  purchase_price: v.optional(v.nullable(v.number())),
  tracking_unit: v.optional(v.string()),
  updated_at: v.optional(v.string()),
  user_id: v.string()
});
export type GearItemsInsertSchemaType = v.InferOutput<typeof GearItemsInsertSchema>;

export const GearItemsUpdateSchema = v.object({
  brand: v.optional(v.nullable(v.string())),
  category_id: v.optional(v.string()),
  created_at: v.optional(v.string()),
  current_usage: v.optional(v.number()),
  description: v.optional(v.nullable(v.string())),
  id: v.optional(v.string()),
  is_archived: v.optional(v.boolean()),
  max_usage: v.optional(v.nullable(v.number())),
  model: v.optional(v.nullable(v.string())),
  name: v.optional(v.string()),
  purchase_date: v.optional(v.nullable(v.string())),
  purchase_price: v.optional(v.nullable(v.number())),
  tracking_unit: v.optional(v.string()),
  updated_at: v.optional(v.string()),
  user_id: v.optional(v.string())
});
export type GearItemsUpdateSchemaType = v.InferOutput<typeof GearItemsUpdateSchema>;

export const SetupGearSchema = v.object({
  created_at: v.string(),
  gear_item_id: v.string(),
  setup_id: v.string()
});
export type SetupGearSchemaType = v.InferOutput<typeof SetupGearSchema>;

export const SetupGearInsertSchema = v.object({
  created_at: v.optional(v.string()),
  gear_item_id: v.string(),
  setup_id: v.string()
});
export type SetupGearInsertSchemaType = v.InferOutput<typeof SetupGearInsertSchema>;

export const SetupGearUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  gear_item_id: v.optional(v.string()),
  setup_id: v.optional(v.string())
});
export type SetupGearUpdateSchemaType = v.InferOutput<typeof SetupGearUpdateSchema>;

export const SetupsSchema = v.object({
  created_at: v.string(),
  description: v.nullable(v.string()),
  id: v.string(),
  name: v.string(),
  updated_at: v.string(),
  user_sport_id: v.string()
});
export type SetupsSchemaType = v.InferOutput<typeof SetupsSchema>;

export const SetupsInsertSchema = v.object({
  created_at: v.optional(v.string()),
  description: v.optional(v.nullable(v.string())),
  name: v.string(),
  updated_at: v.optional(v.string()),
  user_sport_id: v.string()
});
export type SetupsInsertSchemaType = v.InferOutput<typeof SetupsInsertSchema>;

export const SetupsUpdateSchema = v.object({
  created_at: v.optional(v.string()),
  description: v.optional(v.nullable(v.string())),
  id: v.optional(v.string()),
  name: v.optional(v.string()),
  updated_at: v.optional(v.string()),
  user_sport_id: v.optional(v.string())
});
export type SetupsUpdateSchemaType = v.InferOutput<typeof SetupsUpdateSchema>;
