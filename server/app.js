let express = require('express');
let app = express();
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

const cert = 'something here';

app.use('/static', express.static('../dist/static'));
// app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  if(req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
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
    tags: [String],
    comments: []
});

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String
});

// 创建model
const articleModel = db.model('article', articleSchema); // newClass为创建或选中的集合
const userModel = db.model('user', userSchema);

app.use('/back', function(req, res, next) {
  let token = req.cookies.token;

  if(token) {
    let decodedToken = jwt.verify(token, cert);
    userModel.findById(decodedToken.id).then(_ => {
      next();
    }).catch(_ => {
      res.send('no login');
    });
  } else {
    res.send('no login');
  }
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.resolve('./favicon.jpg'));
});

app.get('/', function(req, res) {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.get('/getArticle', function(req, res) {
  articleModel.findById(req.query.id).then(article => {
    res.send(article);
  }).catch(_ => {
    res.sendStatus(500);
  })
});

app.get('/back/getArticle', function(req, res) {
  articleModel.findById(req.query.id).then(article => {
    res.send(article);
  }).catch(_ => {
    res.sendStatus(500);
  })
});

app.get('/getArticles', function(req, res) {
  articleModel.find().sort({createTime: -1}).then(articles => {
    res.send(articles);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.get('/back/getArticlesInfo', function(req, res) {
  articleModel.find({}, {title: 1, createTime: 1 }).sort({createTime: -1}).then(articlesInfo => {
    res.send(articlesInfo);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.get('/getArticlesTitle', function(req, res) {
  articleModel.find({}, {title: 1, tags: 1, createTime: 1}).sort({createTime: -1}).then(articlesTitle => {
    res.send(articlesTitle);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.post('/back/saveArticle', function(req, res) {
  let { title, content, createTime, tags } = req.body;

  articleModel.create({
    title,
    content,
    createTime,
    tags
  }).then(article => {
    res.send(article);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.get('/back/deleteArticle', function(req, res) {
  articleModel.findByIdAndRemove(req.query.id).then(delArticle => {
    res.send(delArticle);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.post('/back/changeArticle', function(req, res) {
  let { id, title, content, createTime, tags } = req.body;

  articleModel.findByIdAndUpdate(id, {
    title,
    content,
    createTime,
    tags
  }, {
    'new': true
  }).then(newArticle => {
    res.send(newArticle);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.get('/getAllTags', function(req, res) {
  articleModel.find().distinct('tags').exec().then(tags => {
    res.send(tags);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.get('/getArticlesByTag', function(req, res) {
  articleModel.find({tags: req.query.tag}).sort({createTime: -1}).exec().then(articles => {
    res.send(articles);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.post('/comment', function(req, res) {
  let {content, nickname, email, id} = req.body;
  let createTime = new Date().getTime();
  let pms = false;
  articleModel.findByIdAndUpdate(id, {'$push':{
    'comments': {
      content: content,
      nickname: nickname,
      email: email,
      createTime: createTime,
      pms: pms,
      belondId: id
    }
  }}).then(_ => {
    res.sendStatus(200);
  }).catch(e => {
    res.sendStatus(500);
  });
});

app.get('/getUnpassComments', function(req, res) {
  articleModel.find().distinct('comments').exec().then(comments => {
    res.send(comments);
  }).catch(_ => {
    res.sendStatus(500);
  });
});

app.post('/commentPass', function(req, res) {
  let { comment } = req.body;

  articleModel.update({
    'comments': comment
  }, {
    '$set': {
      'comments.$.pms': true
    }
  }).then(_ => {
    res.sendStatus(200);
  }).catch(e => {
    res.sendStatus(500);
  });
});

app.post('/deleteComment', function(req, res) {
  let { belondId, nickname, email, createTime, pms, content } = req.body.comment;

  articleModel.update({
    '_id': belondId
  }, {
    '$pull': {
      'comments': req.body.comment
    }
  }).then(_ => {
    res.sendStatus(200);
  }).catch(e => {
    res.sendStatus(500);
  });
});


app.get('/test1', function(req, res) {
  // let obj = {
  //   content: '123',
  //   createTime: new Date().getTime(),
  //   nickname: 'qwe',
  //   email: '532273622@qq.com',
  //   pms: false
  // };
  // articleModel.update({_id: '58d7f9a82ac9216c3204c5a6'}, {'$push':{'comments': obj}}).then(_ => {
  //   res.send(_);
  // });
  articleModel.update({}, {comments: []})
  // articleModel.update({_id: '5919b67c0987422c7971939f'}, {'$pop':{comments: 1}}).then(_=>res.send(_))
});

app.get('/saveUser', function(req, res) {
  let { username, password } = req.query;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, passwordHash) {
      userModel.create({ username, passwordHash }, function(err) {
        res.sendStatus(200);
      })
    });
  });

});

app.post('/login', function(req, res) {
  let { username, password } = req.body;

  userModel.findOne({username: username}).then(user => {
    bcrypt.compare(password, user.passwordHash, function(err, result) {
      if(err || !result) {
        res.send('password incorrect');
      } else {
        let token = jwt.sign({ id: user._id }, cert);
        res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7 * 1000 });
        res.sendStatus(200);
      }
    });
  }).catch(err => {
    res.send('no such user');
  });
});

app.get('/verify', function(req, res) {
  let token = req.cookies.token;

  if(token) {
    let decodedToken = jwt.verify(token, cert);
    userModel.findById(decodedToken.id).then(_ => {
      res.sendStatus(200);
    }).catch(_ => {
      res.send('no login');
    });
  } else {
    res.send('no login');
  }
});

app.get('/compare', function(req, res) {
  let { username, password } = req.query;

  userModel.findOne({username: username}, function(err, user) {
    bcrypt.compare(password, user.passwordHash, function(err, result) {
      let token = jwt.sign({ id: user._id }, cert);
      req.session.isLogin = true;
      res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7 * 1000 });
      res.send({user, result, token});
    })
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
