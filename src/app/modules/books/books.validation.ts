import { z } from 'zod';

const insertBook = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }).multipleOf(0.01),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({
      required_error: 'Category is required',
    }),
  }),
});

const updateBook = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    price: z.number().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = {
  insertBook,
  updateBook,
};
