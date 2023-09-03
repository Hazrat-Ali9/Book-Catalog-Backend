"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    if (role !== 'customer') {
        throw new Error('Only customer can create order');
    }
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new Error('User not found');
    }
    // transaction and rollback
    const newData = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                userId,
                status: 'pending',
            },
        });
        yield transactionClient.orderedBook.createMany({
            data: payload.map(item => ({
                bookId: item.bookId,
                quantity: item.quantity,
                orderId: order.id,
            })),
        });
        return order;
    }));
    if (!newData) {
        throw new Error('Unable to create order');
    }
    const getOrderedBook = yield prisma_1.default.order.findMany({
        where: {
            userId,
        },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                },
            },
        },
    });
    return getOrderedBook;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const whereConditoin = {
        where: {
            userId,
        },
    };
    const condition = role === 'admin' ? {} : whereConditoin;
    const result = yield prisma_1.default.order.findMany(condition);
    return result;
});
const getByIdFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = user;
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            orderedBooks: {
                select: {
                    bookId: true,
                    quantity: true,
                },
            },
        },
    });
    if (role !== 'admin' && (result === null || result === void 0 ? void 0 : result.userId) !== userId) {
        throw new Error('You are not authorized to view this order');
    }
    if (!result) {
        throw new Error('Order not found');
    }
    return result;
});
const updateByIdFromDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.OrderService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateByIdFromDB,
    deleteByIdFromDB,
};
