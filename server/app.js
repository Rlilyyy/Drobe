let express = require('express');
let app = express();
let path = require('path');

app.use('/static', express.static('../dist/static'));
app.get('/', function (req, res) {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
