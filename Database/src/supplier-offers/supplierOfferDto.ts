import { z } from 'zod';

export const CreateSupplierOfferValidator = z.object({
  supplierId: z
    .number({
      required_error: 'supplierId is required',
      invalid_type_error: 'supplierId must be a number',
    })
    .int({ message: 'value must be an integer' }),
});
export type CreateSupplierOfferDto = z.infer<
  typeof CreateSupplierOfferValidator
>;

export const UpdateSupplierOfferValidator = z.object({
  closed: z
    .boolean({
      invalid_type_error: 'closed must be a boolean',
    })
    .optional(),
});
export type UpdateSupplierOfferDto = z.infer<
  typeof UpdateSupplierOfferValidator
>;
