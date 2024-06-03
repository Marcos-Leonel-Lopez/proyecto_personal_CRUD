import express from 'express';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import userRouter from './routes/users.router.js';

// // parche para utilizar json
// import { createRequire } from 'module';

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
// // parche para utilizar json
// const require = createRequire(import.meta.url);
// const empleados = require('../empleados.json');

app.use('/api/users', userRouter);
