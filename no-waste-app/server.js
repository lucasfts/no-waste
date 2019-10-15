const express = require('express');
const path = require('path');
const appName = process.env.npm_package_name;
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${appName}/dist/${appName}`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${appName}/dist/${appName}/index.html`));
});

app.listen(port, function(){
  console.log(`No Waste App listening on port: ${port}`);
});
