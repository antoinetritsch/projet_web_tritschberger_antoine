const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(__dirname + "/dist/5_tritschberger_antoine"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/projet_tritschberger_antoine/index.html"));
});
app.listen(process.env.PORT || 8080);
