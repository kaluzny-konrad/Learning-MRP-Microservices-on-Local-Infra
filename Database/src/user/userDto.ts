import { z } from 'zod';

export const CreateUserValidator = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email' }),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' }),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' }),
});
export type CreateUserDto = z.infer<typeof CreateUserValidator>;

export const SaveUserValidator = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email' }),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' }),
  passwordHash: z.string(),
  passwordSalt: z.string(),
});
export type SaveUserDto = z.infer<typeof SaveUserValidator>;

export const UpdateUserValidator = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email' })
    .optional(),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' })
    .optional(),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' })
    .optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserValidator>;

export const SaveUpdateUserValidator = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email' })
    .optional(),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' })
    .optional(),
  passwordHash: z.string().optional(),
  passwordSalt: z.string().optional(),
});
export type SaveUpdateUserDto = z.infer<typeof SaveUpdateUserValidator>;

export const AuthUserValidator = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(255, { message: 'Must be 255 or fewer characters long' }),
});
export type AuthUserDto = z.infer<typeof AuthUserValidator>;
