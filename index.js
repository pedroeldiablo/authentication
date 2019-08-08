import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router';
import cors from 'cors';

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth', {
    useNewUrlParser: true,
});


var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// App Setup
app.use(morgan('combined'));
app.use(cors(corsOptions));
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
