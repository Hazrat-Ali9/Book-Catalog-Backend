"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const books_routes_1 = require("../modules/books/books.routes");
const categories_routes_1 = require("../modules/categories/categories.routes");
const orders_routes_1 = require("../modules/orders/orders.routes");
const users_route_1 = require("../modules/users/users.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/users',
        route: users_route_1.userRoutes,
    },
    {
        path: '/categories',
        route: categories_routes_1.categoryRoutes,
    },
    {
        path: '/books',
        route: books_routes_1.bookRoutes,
    },
    {
        path: '/orders',
        route: orders_routes_1.orderRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.profileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
