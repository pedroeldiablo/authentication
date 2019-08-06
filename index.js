import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router';

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', {
    useNewUrlParser: true,
});

// App Setup
app.use(morgan('combined'));
app.use(
    bodyParser.json({
        type: '*/*',
    }),
);
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);
