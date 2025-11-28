import express from 'express';
import dotenv from 'dotenv';
import corsConfig from './config/corsConfig.js';
import { addTimestamp, requestLogger } from './middleware/customMiddleware.js';
import { globalErrorHandler } from './middleware/errorHandler.js';
import { urlVersioning } from './middleware/apiVersioning.js';
import { rateLimiting } from './middleware/rateLimiting.js';
import router from './routes/item-routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(requestLogger); // Log each request
app.use(addTimestamp); // Add timestamp to each request

app.use(express.json());
app.use(corsConfig());
app.use(rateLimiting(100, 15 * 60 * 1000)); // 100 requests per 15 minutes

app.use(urlVersioning('v1'));
app.use('/api/v1', router); // No versioning middleware for v2, accessible directly

// global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
