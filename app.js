'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', function(req, res){
    return res.send('I am Up');
});

app.get('/policydocument', function(req, res){
    let fileName = req.query.fileName ? req.query.fileName.toLowerCase(): ""; 
    let filePath = "./"+fileName+".pdf";
    console.log(filePath);
    fs.readFile(filePath , function (err,data){
        // res.setHeader("Content-Disposition","inline");
        // res.contentType("application/pdf");
        res.setHeader('Content-Disposition', 'inline; filename="' + fileName + '".pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    });
});

app.listen(process.env.port || process.env.PORT, function(){
    console.log('Listening on 3000');
});