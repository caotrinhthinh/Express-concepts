const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.get('User-Agent') || 'Unknown';

    console.log(`[${timestamp}] ${method} ${url} - User-Agent: ${userAgent}`);
    next();
};

const addTimestamp = (req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
};

export { requestLogger, addTimestamp };
