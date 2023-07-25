import { z } from 'zod';

export const CreateSellerOfferValidator = z.object({
  sellerId: z
    .number({
      required_error: 'sellerId is required',
      invalid_type_error: 'sellerId must be a number',
    })
    .int({ message: 'value must be an integer' }),
});
export type CreateSellerOfferDto = z.infer<typeof CreateSellerOfferValidator>;

export const UpdateSellerOfferValidator = z.object({
  closed: z
    .boolean({
      invalid_type_error: 'closed must be a boolean',
    })
    .optional(),
});
export type UpdateSellerOfferDto = z.infer<typeof UpdateSellerOfferValidator>;
