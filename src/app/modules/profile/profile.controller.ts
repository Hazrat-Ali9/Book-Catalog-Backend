import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfileFromDB(
    req.user?.userId as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileFromDB,
};
