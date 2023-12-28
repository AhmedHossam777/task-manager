const express = require('express');
const app = express();
const router = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
require('dotenv').config();

//? middlewares
app.use(express.static('./public'));
app.use(express.json());

//? routes

app.use('/api/v1/tasks', router);

app.use(errorHandlerMiddleware);

app.use(notFound);

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
