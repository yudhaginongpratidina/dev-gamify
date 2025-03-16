import 'dotenv/config';
import app from './src/app.js';
import logger from './src/utils/logger.js';

const PROTOCOL = process.env.EXPRESS_PROTOCOL || "http";
const HOST = process.env.EXPRESS_HOSTNAME
const PORT = process.env.EXPRESS_PORT

app.listen(process.env.EXPRESS_PORT, () => {
    logger.info(`Server running at ${PROTOCOL || 'http'}://${HOST || 'localhost'}:${PORT || 3000}`);
});