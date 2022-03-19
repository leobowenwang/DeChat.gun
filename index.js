// react-scripts 5.0.0 does not support express = webpack 5 default imports
const express = require("express");
const GUN = require("gun");
const app = express();
const port = 3030;
app.use(GUN.serve);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://${process.env.PUBLIC_URL}:${port}`);
});

GUN({ web: server });
