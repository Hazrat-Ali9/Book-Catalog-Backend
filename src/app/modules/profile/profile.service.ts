import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { excludePassword } from '../users/users.service';

const getProfileFromDB = async (
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

export const ProfileService = {
  getProfileFromDB,
};
