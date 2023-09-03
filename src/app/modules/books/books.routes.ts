import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './books.controller';
import { BookValidation } from './books.validation';

const router = express.Router();

router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getByIdFromDB);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.insertBook),
  BookController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBook),
  BookController.updateByIdFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDB
);

export const bookRoutes = router;
