const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.static(__dirname + '/dist/brainbase-app'));
app.use("/", proxy("https://staging-api.brainbase.com"));


app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname + '/dist/brainbase-app/index.html'));
});

app.listen(4000);