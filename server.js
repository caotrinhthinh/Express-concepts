import express from 'express';
import dotenv from 'dotenv';
import corsConfig from './config/corsConfig.js';
import { addTimestamp, requestLogger } from './middleware/customMiddleware.js';
import { globalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(requestLogger);
app.use(addTimestamp);

app.use(express.json());
app.use(corsConfig());

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
