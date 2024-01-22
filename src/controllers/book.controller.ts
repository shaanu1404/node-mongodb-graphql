import { Request, Response } from "express";
import { ZodError, z } from 'zod'
import Book from "../models/book.model";
import { ApiResponse } from "../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import Author from "../models/author.model";

const createBookSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    isbn: z.string().min(1, 'ISBN is required'),
    authorId: z.string()
})

const updateBookSchema = z.object({
    name: z.string().optional(),
    isbn: z.string().optional(),
    authorId: z.string().optional()
})

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await Book.find()
    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, books, "Listed all books successfully")
    )
})

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params?.id
    if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, 'id is required')

    const book = await Book.findById(id)
    if (!book) throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found with the given id')

    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, book, "Found book successfully")
    )
})

export const createBook = asyncHandler(async (req: Request, res: Response) => {
    const { name, isbn, authorId } = createBookSchema.parse(req.body)

    const author = await Author.findById(authorId)
    if (!author) throw new ApiError(StatusCodes.NOT_FOUND, 'Author not found with the given id')

    const book = await Book.create({ name, isbn, authorId })
    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(StatusCodes.CREATED, book, 'Book created successfully')
    )
})

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
    const { name, isbn, authorId } = updateBookSchema.parse(req.body)

    const id = req.params?.id
    if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, 'id is required')

    const book = await Book.findById(id)
    if (!book) throw new ApiError(StatusCodes.NOT_FOUND, 'Book not found with the given id')

    const updatedBook = await Book.findOneAndUpdate({ _id: id }, {
        $set: { name, isbn, authorId },
    }, { new: true })

    return res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, updatedBook, 'Book updated successfully')
    )
})