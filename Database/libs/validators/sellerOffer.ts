import { z } from 'zod';

export const CreateSellerOfferValidator = z.object({
  sellerId: z.number().int(),
  closed: z.boolean().optional(),
});
export type CreateSellerOfferDto = z.infer<typeof CreateSellerOfferValidator>;

export const UpdateSellerOfferValidator = z.object({
  sellerId: z.number().int().optional(),
  closed: z.boolean().optional(),
});
export type UpdateSellerOfferDto = z.infer<typeof UpdateSellerOfferValidator>;
