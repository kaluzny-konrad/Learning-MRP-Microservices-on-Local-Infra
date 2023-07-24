import { z } from 'zod';

export const CreateSupplierSubOfferValidator = z.object({
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
export type CreateSupplierSubOfferDto = z.infer<
  typeof CreateSupplierSubOfferValidator
>;

export const UpdateSupplierSubOfferValidator = z.object({
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
export type UpdateSupplierSubOfferDto = z.infer<
  typeof UpdateSupplierSubOfferValidator
>;
