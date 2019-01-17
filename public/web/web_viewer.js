module.exports = {
    template:`<!DOCTYPE html>
    <!--
    Copyright 2012 Mozilla Foundation
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    
    Adobe CMap resources are covered by their own copyright but the same license:
    
        Copyright 1990-2015 Adobe Systems Incorporated.
    
    See https://github.com/adobe-type-tools/cmap-resources
    -->
    <html dir="ltr" mozdisallowselectionprint>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="google" content="notranslate">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>PDF.js viewer</title>
    
        <style>
        #container > *:not(:first-child) {
          border-top: solid 1px black; 
        }
        </style>
        <link href="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.css" rel="stylesheet"/>
        <script src="https://npmcdn.com/pdfjs-dist/web/compatibility.js"></script>
        <script src="https://npmcdn.com/pdfjs-dist/build/pdf.js"></script>
        <script src="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.js"></script>
    <script>
    var url = "https://cdn.mozilla.net/pdfjs/tracemonkey.pdf";
var container = document.getElementById('container');
// Load document
var pdfjsDistBuildPdf = window['pdfjsDistBuildPdf']
pdfjsDistBuildPdf.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
pdfjsDistBuildPdf.getDocument(url).then(function (doc) {
  var promise = Promise.resolve();
  for (var i = 0; i < doc.numPages; i++) {
    // One-by-one load pages
    promise = promise.then(function (id) {
      return doc.getPage(id + 1).then(function (pdfPage) {
// Add div with page view.
var SCALE = 1.0; 
var pdfPageView = new pdfjsDistBuildPdf.PDFPageView({
      container: container,
      id: id,
      scale: SCALE,
      defaultViewport: pdfPage.getViewport(SCALE),
      // We can enable text/annotations layers, if needed
      textLayerFactory: new pdfjsDistBuildPdf.DefaultTextLayerFactory(),
      annotationLayerFactory: new pdfjsDistBuildPdf.DefaultAnnotationLayerFactory()
    });
    // Associates the actual page with the view, and drawing it
    pdfPageView.setPdfPage(pdfPage);
    return pdfPageView.draw();        
      });
    }.bind(null, i));
  }
  return promise;
});
    </script>
      </head>
    
      <body tabindex="1" class="loadingInProgress">
      <div id="container" class="pdfViewer singlePageView"></div>
      </body>
    </html>
    `
    };