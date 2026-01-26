import { z } from "zod";

export const ClothingSchema = z.object({
  id: z.string(),          // ULID
  name: z.string(),
  location: z.string(),
  boughtAt: z.string(),    // ISO date string
});

export type Clothing = z.infer<typeof ClothingSchema>;
