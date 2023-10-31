import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { queryMaker } from 'mongoose-query-maker'
import { apiResponse, catchAsync } from '../../../shared'
import { reviewQuery, reviewSelector } from './review.constaint'
import { iReview } from './review.interface'
import { ReviewService as service } from './review.service'

const createData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.createData(req.body)

  apiResponse<iReview>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Review created successfull.',
    data: result
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const query = queryMaker(req.query, req.user, reviewQuery, reviewSelector)
  const { result, meta } = await service.getAllData(query)

  apiResponse<iReview[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Reviews fetched successfull.',
    data: result,
    meta
  })
})

const getData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getData(req.params.id)

  apiResponse<iReview>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Review fetched successfull.',
    data: result
  })
})

const updateData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.updateData(req.params.id, req.body)

  apiResponse<iReview>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Review updated successfull.',
    data: result
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const result = await service.deleteData(req.params.id)

  apiResponse<iReview>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Review deleted successfull.',
    data: result
  })
})

export const ReviewController = {
  createData,
  getAllData,
  getData,
  updateData,
  deleteData
}
