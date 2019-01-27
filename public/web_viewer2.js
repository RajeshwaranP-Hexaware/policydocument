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
      #viewerContainer {
        overflow: auto;
        position: absolute;
        width: 100%;
        height: 100%;
      }
      </style>
    
      <link href="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.css" rel="stylesheet"/>
      <script src="https://npmcdn.com/pdfjs-dist/build/pdf.js"></script> 
      <script src="https://npmcdn.com/pdfjs-dist/web/pdf_viewer.js"></script>
      
    </head>
    
    <body tabindex="1">
    
    <div id="viewerContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
    
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
        pdfjsLib = window['pdfjsLib'];
        pdfjsViewer = window['pdfjsViewer']
        console.log(pdfjsLib);
        console.log(pdfjsViewer);
        pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://npmcdn.com/pdfjs-dist/build/pdf.worker.js';
        
        // Some PDFs need external cmaps.
        //
        var CMAP_URL = 'https://npmcdn.com/pdfjs-dist/cmaps/';
        var CMAP_PACKED = true;
        
        var DEFAULT_URL = 'https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf#page=2';
        var SEARCH_FOR = ''; // try 'Mozilla';

var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
var pdfLinkService = new pdfjsViewer.PDFLinkService();

// (Optionally) enable find controller.
var pdfFindController = new pdfjsViewer.PDFFindController({
  linkService: pdfLinkService,
});

var pdfViewer = new pdfjsViewer.PDFViewer({
  container: container,
  currentPageNumber : 2,
  linkService: pdfLinkService,
  findController: pdfFindController,
});
pdfLinkService.setViewer(pdfViewer);

document.addEventListener('pagesinit', function () {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = 'page-width';

  if (SEARCH_FOR) { // We can try search for things
    pdfFindController.executeCommand('find', { query: SEARCH_FOR, });
  }
});

// Loading document.
var loadingTask = pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
});
loadingTask.promise.then(function(pdfDocument) {
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
});
      });
    });
      </script>
    </body>
    </html>   `
}