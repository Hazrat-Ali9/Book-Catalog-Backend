import { Category, Order } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  user: JwtPayload,
  payload: {
    bookId: string;
    quantity: number;
  }[]
) => {
  const { userId, role } = user;

  if (role !== 'customer') {
    throw new Error('Only customer can create order');
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new Error('User not found');
  }

  // transaction and rollback
  const newData = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId,
        status: 'pending',
      },
    });

    await transactionClient.orderedBook.createMany({
      data: payload.map(item => ({
        bookId: item.bookId,
        quantity: item.quantity,
        orderId: order.id,
      })),
    });

    return order;
  });

  if (!newData) {
    throw new Error('Unable to create order');
  }

  const getOrderedBook = await prisma.order.findMany({
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
};

const getAllFromDB = async (user: JwtPayload): Promise<Order[]> => {
  const { userId, role } = user;
  const whereConditoin = {
    where: {
      userId,
    },
  };
  const condition = role === 'admin' ? {} : whereConditoin;
  const result = await prisma.order.findMany(condition);
  return result;
};

const getByIdFromDB = async (
  id: string,
  user: JwtPayload
): Promise<Order | null> => {
  const { userId, role } = user;
  const result = await prisma.order.findUnique({
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

  if (role !== 'admin' && result?.userId !== userId) {
    throw new Error('You are not authorized to view this order');
  }

  if (!result) {
    throw new Error('Order not found');
  }

  return result;
};

const updateByIdFromDB = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
  deleteByIdFromDB,
};
