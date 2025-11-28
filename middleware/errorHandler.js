class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'An unexpected error occurred.',
        });
    }
};

export { APIError, asyncHandler, globalErrorHandler };
