'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', function(req, res){
    return res.send('I am Up');
});

app.get('/policydocument', function(req, res){
    let fileName = req.query.fileName ? req.query.fileName.toLowerCase(): ""; 
    //let filePath = "./"+fileName+".pdf";
    let filePath = "./"+fileName;
     console.log(filePath);
     fs.readFile(filePath , function (err,data){
         // res.setHeader("Content-Disposition","inline");
         // res.contentType("application/pdf");
         // res.setHeader('Content-Disposition', 'inline; filename=' + fileName + '.pdf');
         res.setHeader('Content-Disposition', 'inline; filename=' + fileName );
         res.setHeader('Content-Type', 'application/pdf');
         res.send(data);
     });

    // let webviewHtml = '<html><head><script type="text/javascript">function windoeOpen(){window.location.href = "file:///fileName"}</script></head><body onload ="windoeOpen()">';
    
    // webviewHtml = webviewHtml.replace("fileName", fileName);
    // console.log(webviewHtml);
    // res.send(webviewHtml);

  //var stream = fs.readStream(filePath);
  // Be careful of special characters

  //fileName = encodeURIComponent(fileName);
  // Ideally this should strip them

//  res.setHeader('Content-disposition', 'inline; filename="' + fileName + '"');
 // res.setHeader('Content-type', 'application/pdf');

 // stream.pipe(res);

});

app.get('/policy', function(req, res){
    res.redirect();
});

app.listen(process.env.port || process.env.PORT, function(){
    console.log('Listening on 3000');
});
