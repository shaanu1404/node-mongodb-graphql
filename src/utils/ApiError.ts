import { StatusCodes } from 'http-status-codes'

class ApiError extends Error {
    statusCode: StatusCodes;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: StatusCodes,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }