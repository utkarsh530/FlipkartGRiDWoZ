const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var cmd = require('node-cmd');
var cors = require('cors')
const fs = require('fs');
var busboy = require('connect-busboy');

app.use(cors())

app.use(busboy());

var filename = '';

app.set("view engine", "ejs");

var command1 = `conda init`
var command2 = `conda activate base`
var command3 = `python ../../WoZServer/Test.py ${filename}`
console.log(__dirname);

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/getDir", function (req, res) {
    const testFolder = __dirname + '/Frontend/public/files/';

    fs.readdir(testFolder, (err, files) => { // returns an array of file names
        console.log(files);
        res.send(files)
    });

});


app.post('/fileUpload', async function (req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        // fstream = fs.createWriteStream(__dirname + '/Frontend/public/files/' + filename);
        fstream = fs.createWriteStream('../../WoZServer/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("File Uploaded");
            const testFolder = __dirname + '/Frontend/public/files/';

            fs.readdir(testFolder, (err, files) => { // returns an array of file names
                console.log(files);
                res.send(files)
            });
        });
    });
});


app.post("/runPythonScript", async function (req, res) {
    await cmd.get(
        command1
        , function (err, data, stderr) {
            console.log(err);
            console.log(data);

        });
    await cmd.get(
        command2
        , function (err, data, stderr) {
            console.log(err);
            console.log(data);
        });
    await cmd.get(
        command3
        , function (err, data, stderr) {
            console.log(err);
            console.log(data);

        });
    res.send("Python Script Executed")
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log("Server is running at " + PORT));