import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ErrorResponse } from "./ApiResponse"
import { ApiError } from "./ApiError"
import { ZodError } from "zod"

const asyncHandler = (requestHandler: (req: Request, res: Response, next?: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            let data: any = null;
            let message: any = error?.message;
            let statusCode = error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

            if (error instanceof ZodError) {
                statusCode = StatusCodes.BAD_REQUEST
                data = error.flatten().fieldErrors
                message = 'Invalid request body'
            }

            return res.status(statusCode).json(
                new ErrorResponse(statusCode, data, message)
            )
            // next(err)
        })
    }
}

export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }