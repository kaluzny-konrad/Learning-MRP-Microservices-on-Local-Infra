import { z } from 'zod';

export const CreateSupplierValidator = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' }),
});
export type CreateSupplierDto = z.infer<typeof CreateSupplierValidator>;

export const UpdateSupplierValidator = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' })
    .optional(),
});
export type UpdateSupplierDto = z.infer<typeof UpdateSupplierValidator>;
