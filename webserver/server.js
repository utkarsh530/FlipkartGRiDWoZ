const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var cmd = require('node-cmd');

app.set("view engine", "ejs");

var command = `python hello.py`

app.get("/", function(req,res){
    res.render("home");
});
app.post("/runPythonScript", function(req, res){
    cmd.get(
        command
        , function (err, data, stderr) {
            console.log(data);
        });
    res.send("Python Script Executed")
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log("Server is running at "+ PORT));
 