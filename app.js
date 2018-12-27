'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/policydocument', function(req, res){
    let fileName = req.query.fileName ? req.query.fileName.toLowerCase(): ""; 
    let filePath = "./"+fileName+".pdf";
    console.log(filePath);
    fs.readFile(filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.listen(3000, function(){
    console.log('Listening on 3000');
});