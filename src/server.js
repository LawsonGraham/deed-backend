require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const nftRouter = require('./routes/nftRouter');
const projectRouter = require('./routes/projectRouter');

const port = process.env.PORT ? process.env.PORT : 4000;
console.log(process.env.MONGOOSE);

mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('DB connected successfully!');
});
db.on('error', (err) => {
  console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(
  bodyParser.json()
);

app.use('/v1/nft/', nftRouter);
app.use('/v1/project/', projectRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
