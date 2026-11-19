import { z } from "zod";

export const accountSchema = z.object({
  bank: z.string(),
  branch: z.string(),
  account_number: z.string(),
});