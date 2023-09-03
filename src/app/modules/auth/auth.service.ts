import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { SignInData } from './auth.interface';
import { excludePassword } from '../users/users.service';

const signup = async (user: User): Promise<Omit<User, 'password'>> => {
  // check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      email: user?.email,
    },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }
  
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );

  const result = await prisma.user.create({
    data: user,
    select: excludePassword,
  });
  return result;
};

const signin = async (payload: SignInData) => {
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  const { id: userId, role } = user;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return token;
};

export const AuthService = {
  signup,
  signin,
};
