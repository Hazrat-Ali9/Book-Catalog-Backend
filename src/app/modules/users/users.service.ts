import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

export const excludePassword = {
  id: true,
  name: true,
  email: true,
  role: true,
  contactNo: true,
  address: true,
  profileImg: true,
};


const getAllFromDB = async (): Promise<Omit<User, 'password'>[]> => {
  const result = await prisma.user.findMany({
    select: excludePassword,
  });
  return result;
};

const getByIdFromDB = async (
  id: string
): Promise<Omit<User, 'password'> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: excludePassword,
  });
  return result;
};

const updateByIdFromDB = async (
  id: string,
  data: Partial<User>
): Promise<Omit<User, 'password'> | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: excludePassword,
  });
  return result;
};

const deleteByIdFromDB = async (
  id: string
): Promise<Omit<User, 'password'> | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: excludePassword,
  });
  return result;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
  deleteByIdFromDB,
};
