let express = require('express');
let app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

app.use('/static', express.static('../dist/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
    content: String,
    createTime: Number,
    tags: [String]
});

const tagSchema = new mongoose.Schema({
    name: String
});

// 创建model
const articleModel = db.model('article', articleSchema) // newClass为创建或选中的集合
const tagModel = db.model('tag', tagSchema) // newClass为创建或选中的集合

app.get('/', function (req, res) {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.get('/saveArticle', function(req, res) {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/getArticle', function(req, res) {
  articleModel.findById(req.query.id, function(err, article) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(article);
    }
  })
});

app.get('/getArticles', function(req, res) {
  articleModel.find(function(err, articles) {
    res.send(articles);
  });
});

app.get('/getArticlesInfo', function(req, res) {
  articleModel.find({}, {title: 1, createTime: 1 }, function(err, articlesTitle) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(articlesTitle);
    }
  });
});

app.get('/getArticlesTitle', function(req, res) {
  articleModel.find({}, {title: 1, tags: 1, createTime: 1}, function(err, articlesTitle) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(articlesTitle);
    }
  });
});

app.post('/saveArticle', function(req, res) {
  let { title, content, createTime, tags } = req.body;

  articleModel.create({
    title,
    content,
    createTime,
    tags
  }, function(err, article) {
    if(err) {
      res.sendStatus(500);
    } else {
      // res.sendStatus(200);
      let tagArr = [];
      tags.forEach(tag => {
        tagArr.push({name: tag});
      });
      tagModel.create(tagArr, function(err) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      })
    };
  })
});

app.get('/deleteArticle', function(req, res) {
  articleModel.findByIdAndRemove(req.query.id, function(err) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/changeArticle', function(req, res) {
  let { id, title, content, createTime, tags } = req.body;

  articleModel.findByIdAndUpdate(id, {
    title,
    content,
    createTime,
    tags
  }, {
    'new': true
  }, function(err, newArticle) {
    if(err) {
      res.sendStatus(500);
    } else {
      let tagArr = [];
      tags.forEach(tag => {
        tagArr.push({name: tag});
      });
      tagModel.create(tagArr, function(err) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.send(newArticle);
        }
      })
    }
  });
});
app.get('/test1', function(req, res) {
  tagModel.find().distinct('name').exec(function(err, result) {
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
