import { z } from "zod";

export const cardSchema = z.object({
  name: z.string(),
  card_number: z.string(),
  expiration: z.string().datetime(),
  emitter: z.string(),
});