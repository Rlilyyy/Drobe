let express = require('express');
let app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

app.use('/static', express.static('../dist/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require('mongoose');
// 连接mongodb
mongoose.connect('mongodb://localhost/drobe');
// 实例化连接对象
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误：'));
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
});
// 创建schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

// 创建model
const articleModel = db.model('article', articleSchema) // newClass为创建或选中的集合

app.get('/', function (req, res) {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.get('/saveArticle', function(req, res) {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/getArticles', function(req, res) {
  articleModel.find(function(err, articles) {
    res.send(articles);
  });
});

app.post('/saveArticle', function(req, res) {
  articleModel.create({
    title: req.body.title,
    content: req.body.content
  }, function(err, article) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    };
  })
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
