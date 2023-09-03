"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const insertBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }).multipleOf(0.01),
        publicationDate: zod_1.z.string({
            required_error: 'Publication date is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Category is required',
        }),
    }),
});
const updateBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        publicationDate: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    insertBook,
    updateBook,
};
