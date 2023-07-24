import { z } from 'zod';

export const CreateSellerSubOfferValidator = z.object({
  sellerId: z
    .number({
      required_error: 'sellerId is required',
      invalid_type_error: 'sellerId must be a number',
    })
    .int({ message: 'value must be an integer' }),
  closed: z
    .boolean({
      invalid_type_error: 'closed must be a boolean',
    })
    .optional(),
});
export type CreateSellerSubOfferDto = z.infer<
  typeof CreateSellerSubOfferValidator
>;

export const UpdateSellerSubOfferValidator = z.object({
  sellerId: z
    .number({
      required_error: 'sellerId is required',
      invalid_type_error: 'sellerId must be a number',
    })
    .int({ message: 'value must be an integer' })
    .optional(),
  closed: z
    .boolean({
      invalid_type_error: 'closed must be a boolean',
    })
    .optional(),
});
export type UpdateSellerSubOfferDto = z.infer<
  typeof UpdateSellerSubOfferValidator
>;
