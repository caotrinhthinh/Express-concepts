import rateLimit from 'express-rate-limit';

const rateLimiting = (maxRequests, time) => {
    return rateLimit({
        limit: maxRequests, // limit each IP to 100 requests per windowMs
        windowMs: time, // e.g., 15 minutes
        message: 'Too many requests from this IP, please try again after 15 minutes',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
};

export { rateLimiting };
