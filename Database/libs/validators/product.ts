import { z } from 'zod';

export const CreateProductValidator = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  image: z.string().min(3).max(255),
});
export type CreateProductDto = z.infer<typeof CreateProductValidator>;

export const UpdateProductValidator = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  image: z.string().min(3).max(255).optional(),
});
export type UpdateProductDto = z.infer<typeof UpdateProductValidator>;
