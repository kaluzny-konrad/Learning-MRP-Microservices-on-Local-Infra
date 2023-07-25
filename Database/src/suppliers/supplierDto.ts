import { z } from 'zod';

export const CreateSupplierValidator = z.object({
  userId: z
    .string({
      required_error: 'userId is required',
      invalid_type_error: 'userId must be a string',
    })
    .cuid({ message: 'userId must be a valid uuid' }),
  discountFactor: z
    .number({
      invalid_type_error: 'discountFactor must be a number',
    })
    .optional(),
  companyName: z.string({
    invalid_type_error: 'companyName must be a string',
  }),
});
export type CreateSupplierDto = z.infer<typeof CreateSupplierValidator>;

export const UpdateSupplierValidator = z.object({
  discountFactor: z
    .number({
      invalid_type_error: 'discountFactor must be a number',
    })
    .optional(),
  companyName: z
    .string({
      invalid_type_error: 'companyName must be a string',
    })
    .optional(),
});
export type UpdateSupplierDto = z.infer<typeof UpdateSupplierValidator>;
