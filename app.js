const express = require('express');
const http = require('http');

const app = express();
const router = require('./routes/tasks');

//? middlewares
app.use(express.json());

//? routes
app.get('/hello', (req, res, next) => {
  res.send('Hello world');
});

app.use('/api/v1/tasks', router);

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
