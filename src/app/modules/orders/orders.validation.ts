import { z } from 'zod';

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
