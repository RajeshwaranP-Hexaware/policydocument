module.exports = {
    template:`
    <html dir="ltr" mozdisallowselectionprint>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <meta name="google" content="notranslate">
      <title>PDF.js page viewer using built components</title>
    
      <style>
        body {
          background-color: #808080;
          margin: 0;
          padding: 0;
        }
      </style>
    
      <link href="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.css" rel="stylesheet"/>
      <script src="https://npmcdn.com/pdfjs-dist/build/pdf.js"></script> 
      <script src="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.js"></script>
      
    </head>
    
    <body tabindex="1">
    
      <div id="pageContainer" class="pdfViewer singlePageView"></div>
    
      <script src="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.js"></script>
      <script data-main = "config" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>
      <script>
          require(['config'], function(){
            require(['pdfjsDistPdf', 'pdfjsDistView'], function(pdfjsLib, pdfjsViewer) {
          //var pdfjsLib = require('https://npmcdn.com/pdfjs-dist/build/pdf.js');
        
        // The workerSrc property shall be specified.
        //
        console.log(pdfjsLib);
        console.log(pdfjsViewer);
        pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://npmcdn.com/pdfjs-dist/build/pdf.worker.js';
        
        // Some PDFs need external cmaps.
        //
        var CMAP_URL = 'https://npmcdn.com/pdfjs-dist/cmaps/';
        var CMAP_PACKED = true;
        
        var DEFAULT_URL = 'https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf';
        var PAGE_TO_VIEW = 1;
        var SCALE = 1.0;
        
        var container = document.getElementById('pageContainer');
        
        // Loading document.
        var loadingTask = pdfjsLib.getDocument({
          url: DEFAULT_URL,
          cMapUrl: CMAP_URL,
          cMapPacked: CMAP_PACKED,
        });
        loadingTask.promise.then(function(pdfDocument) {
          // Document loaded, retrieving the page.
          return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
            // Creating the page view with default parameters.
            var pdfPageView = new pdfjsViewer.PDFPageView({
              container: container,
              id: PAGE_TO_VIEW,
              scale: SCALE,
              defaultViewport: pdfPage.getViewport({ scale: SCALE, }),
              // We can enable text/annotations layers, if needed
              textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
              annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
            });
            // Associates the actual page with the view, and drawing it
            pdfPageView.setPdfPage(pdfPage);
            return pdfPageView.draw();
          });
        });
      });
    });
      </script>
    </body>
    </html>   `
}