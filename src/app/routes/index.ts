import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { bookRoutes } from '../modules/books/books.routes';
import { categoryRoutes } from '../modules/categories/categories.routes';
import { orderRoutes } from '../modules/orders/orders.routes';
import { userRoutes } from '../modules/users/users.route';
import { profileRoutes } from '../modules/profile/profile.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
