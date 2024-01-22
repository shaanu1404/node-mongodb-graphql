import { Request, Response } from "express";
import { z } from 'zod'
import Book from "../models/book.model";
import { ApiResponse } from "../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import Author from "../models/author.model";

const createAuthorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
})

export const createAuthor = asyncHandler(async (req: Request, res: Response) => {
    const { name } = createAuthorSchema.parse(req.body);

    const author = await Author.create({ name })
    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(StatusCodes.CREATED, author, 'New author created successfully')
    )
})

export const getAllAuthors = asyncHandler(async (req: Request, res: Response) => {
    const authors = await Author.find()
    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, authors, 'Listed all authors successfully')
    )
})

export const getAuthorById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params?.id;
    if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, 'Author id is required')

    const author = await Author.findById(id)
    if (!author) throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found with the given id')

    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, author, 'Found author successfully')
    )
})

export const getBooksByAuthor = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, 'Author id is required')

    const author = await Author.findById(id)
    if (!author) throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found with the given id')

    const books = await Book.find({ authorId: id })
    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, books, 'Found all books by author')
    )
})