#target illustrator

(function() {
    // === Configuration ===
    var ARTBOARD_WIDTH_MM  = 200;  // width  in millimetres
    var ARTBOARD_HEIGHT_MM = 500;  // height in millimetres
    var ITEM_HEIGHT_MM     = 60;   // desired height of placed PNG
    var START_MARGIN_MM    = 10;   // margin from top/left
    var GAP_MM             = 5;    // gap between repeated items

    function mmToPt(mm) {
        return mm * 72 / 25.4;
    }

    var artboardWidth  = mmToPt(ARTBOARD_WIDTH_MM);
    var artboardHeight = mmToPt(ARTBOARD_HEIGHT_MM);

    // Create new RGB document with one artboard
    var doc = app.documents.add(DocumentColorSpace.RGB, artboardWidth, artboardHeight);
    var abRect = doc.artboards[0].artboardRect;
    var abTop  = abRect[1];
    var abLeft = abRect[0];

    // Locate PatCol.png next to this script
    var scriptFile   = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var pngFile      = new File(scriptFolder + "/PatCol.png");

    if (!pngFile.exists) {
        alert("PatCol.png not found in " + scriptFolder.fsName);
        return;
    }

    // Place the PNG
    var item = doc.placedItems.add();
    item.file = pngFile;
    item.embed();

    // Resize to target height (approx. 60 mm)
    if (item.height !== 0) {
        var scale = (mmToPt(ITEM_HEIGHT_MM) / item.height) * 100;
        item.resize(scale, scale); // uniform scaling
    }

    // Initial position
    var marginLeft = mmToPt(START_MARGIN_MM);
    var marginTop  = mmToPt(START_MARGIN_MM);
    item.left = abLeft + marginLeft;
    item.top  = abTop  - marginTop;

    // Duplicate item horizontally until artboard width is filled
    var gap   = mmToPt(GAP_MM);
    var itemWidth = item.width;
    var availableWidth = artboardWidth - marginLeft;
    var copies = Math.floor((availableWidth - itemWidth) / (itemWidth + gap));

    for (var i = 1; i <= copies; i++) {
        var dup = item.duplicate();
        dup.left = item.left + i * (itemWidth + gap);
        dup.top  = item.top;
    }
})();
