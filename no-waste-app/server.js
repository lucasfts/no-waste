const express = require('express');
const path = require('path');
const appName = process.env.npm_package_name;
const app = express();

app.use(express.static(`${appName}/dist/${appName}`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${appName}/dist/${appName}/index.html`));
});

app.listen(process.env.PORT || 8080);
