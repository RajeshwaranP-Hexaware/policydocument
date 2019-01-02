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

app.get('/docs', function(req, res){
    //let webviewHtml = '<html><head></head><body><iframe src="https://docs.google.com/gview?url=https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf&embedded=true" onload="javascript:this.contentWindow.location.hash=0.page.20;" style="width: 1000px;height: 1000px;"></body>'
    //let webviewHtml = '<html><head><meta charset="UTF-8"><style>body {margin: 0;}iframe {display: block;background: #000;border: none;height: 1000vh;width: 1000vw;}</iframe></style></head><body><iframe src="https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf#page=5" style="width: 100px;height: 200px;"></body>';
    // let webviewHtml = '<html><head><meta charset="UTF-8"></head><body><iframe src="https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf#page=7" width=100% height=100%></iframe></body>';
    // res.send(webviewHtml);
    return res.sendFile('/pdf.html', {root: __dirname });
});

app.get('/policy', function(req, res){
    res.redirect();
});

app.listen(process.env.port || process.env.PORT, function(){
    console.log('Listening on 3000');
});
