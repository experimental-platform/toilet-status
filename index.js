var express = require('express');
var fs = require('fs');
var app = express();
var storagePath = "/data/toilet_status.txt";

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/update', function(req, res) {
  console.log(new Date().toString(), "Received update:", res.params.status);
  fs.writeFileSync(storagePath, JSON.stringify({ status: res.params.status }));
  res.json({ success: true });
});

app.get('/status', function(req, res) {
  var data = fs.readFileSync(storagePath);
  res.json(JSON.parse(data));
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
