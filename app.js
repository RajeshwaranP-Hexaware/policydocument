'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors');
var path = require('path');

app.use(cors());
app.use(express.static('public'));
app.use('/web', express.static(path.join(__dirname, 'public')))

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
 //   let webviewHtml = '<html><head><meta charset="UTF-8"></head><body><embed type="application/pdf" src="https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf#page=7" width=90% height=90%></body>';
    let webviewHtml = '<html><body><object data="https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf#page=7" type="application/pdf" width="600" height="500"><embed src="https://policy-test.herokuapp.com/policydocument?fileName=leave%20policy.pdf#page=7" width="600px" height="500px" /></embed></object></body></html>'
    res.send(webviewHtml);
    //return res.render('/pdf.html');
    // fs.readFile("./pdf.html", function (error, pgResp) {
    //     resp.writeHead(200, { 'Content-Type': 'text/html' });
    //     resp.write(pgResp);
    //     resp.end();
    // });

});

app.get('/pdf', function(req, res){
    console.log(__dirname);
    console.log( __dirname.replace(path.basename(__dirname),''));
    res.sendFile(path.join(__dirname + '/public/web/viewer.html?file=leavepolicy.pdf#page=5'));
    //res.sendFile(path.join(__dirname,'../public', '/web/viewer.html?file=leavepolicy.pdf#page=5'));
});

app.listen(process.env.port || process.env.PORT, function(){
    console.log('Listening on 3000');
});
