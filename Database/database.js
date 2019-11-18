let express = require("express");
let app = express();
let path = require("path");
let mysql = require("mysql");
let bodyParser = require("body-parser");
let request = require("ajax-request");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connection
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "PatentChain"
});

// Routes
app.use(express.static(__dirname + "/src"));
app.use(express.static("src"));

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname + "index.html"));
});
app.get("/profile", function(req, res) {
  res.sendFile(path.join(__dirname + "profile.html"));
});

app.post("/login", function(req, res) {
  let user_name = req.body.user_name;
  let user_password = req.body.user_password;

  con.connect(function(err) {
    if (err) throw err;
    let sql =
      "SELECT * FROM login where user_name = '" +
      user_name +
      "' and user_password =" +
      user_password +
      "";
    con.query(sql, function(err, result) {
      if (err) {
        throw err;
      } else {
        res.redirect("/admin");
      }
      res.end();
    });
  });
});
