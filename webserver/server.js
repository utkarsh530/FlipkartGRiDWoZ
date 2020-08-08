const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var cmd = require('node-cmd');
var cors = require('cors')
const fs = require('fs');
var busboy = require('connect-busboy');

app.use(cors())

app.use(busboy()); 



app.set("view engine", "ejs");

var command = `python hello.py`

app.get("/", function(req,res){
    res.render("home");
});

app.get("/getDir", function(req,res){
    const testFolder = __dirname + '/Frontend/public/files/';
    
    fs.readdir(testFolder, (err, files) => { // returns an array of file names
        console.log(files);
        res.send(files)
      });
      
});


app.post('/fileUpload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/Frontend/public/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send("File Uploaded");
        });
    });
    
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
 