const express = require('express');
const app = express();
const port = 5000;

const config = require('./server/config/key');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('connect')).catch(err => console.log(err));

app.use('/api/users', require('./server/routes/users'));
app.use('/api/video', require('./server/routes/video'));
app.use('/api/subscribe', require('./server/routes/subscribe'));
app.use('/api/comment', require('./server/routes/comment'));
app.use('/api/like', require('./server/routes/like'));




app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})