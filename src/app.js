import express from 'express';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import userRouter from './routes/users.router.js';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.disable('x-powered-by');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.use('/api/users', userRouter);

export { app };
