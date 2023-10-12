import { Request, Response } from 'express'
import httpStatus from 'http-status'
import apiResponse from '../../../shared/apiResponse'
import catchAsync from '../../../shared/catchAsync'
import { iCategory } from './category.interface'
import {
  createCategoryDB,
  deleteCategoryDB,
  getCategoriesDB,
  getCategoryDB,
  updateCategoryDB
} from './category.service'

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await createCategoryDB(req.body)

  apiResponse<iCategory>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category created successfull.',
    data: result
  })
})

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await getCategoriesDB()

  apiResponse<iCategory[]>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Categories fetched successfull.',
    data: result
  })
})

export const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await getCategoryDB(req.params.id)

  apiResponse<iCategory>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category fetched successfull.',
    data: result
  })
})

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await updateCategoryDB(req.params.id, req.body)

  apiResponse<iCategory>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category updated successfull.',
    data: result
  })
})

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await deleteCategoryDB(req.params.id)

  apiResponse<iCategory>(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Category deleted successfull.',
    data: result
  })
})
