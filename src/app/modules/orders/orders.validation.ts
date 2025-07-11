import { z } from 'zod';
// orders validations
const insertCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateCategory = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoryValidation = {
  insertCategory,
  updateCategory,
};
