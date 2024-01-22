import { StatusCodes } from 'http-status-codes'

class ApiResponse {
    statusCode: StatusCodes;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: StatusCodes, data: any, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

class ErrorResponse extends ApiResponse {
    constructor(statusCode: StatusCodes, data: any, message = "Something went wrong!") {
        super(statusCode, data, message)
        this.success = false
    }
}

export { ApiResponse, ErrorResponse }