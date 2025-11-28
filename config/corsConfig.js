import cors from 'cors';

const corsOptions = () => {
    return cors({
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:3000'];
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true); // giving permission so that req can be allowed
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },

        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Acept-Version'],
        exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // client can access these headers
        credentials: true, // allow cookies and token to be sent
        preflightContinue: false,
        maxAge: 600, // 10 minutes
    });
};

export default corsOptions;
