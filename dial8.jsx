#target illustrator

(function () {
    var TARGET_HEIGHT = 400;
    var GAP = 20;
    var MARGIN_TOP = 50;
    var MARGIN_LEFT = 50;

    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    var pngFile = new File(folder + "/PatCol.png");
    var epsFile = new File(folder + "/PatBlk.eps");

    if (!pngFile.exists || !epsFile.exists) {
        alert("Required files not found in " + folder.fsName);
        return;
    }

    // 1. FORCE NEW DOCUMENT
    var doc = app.documents.add(DocumentColorSpace.RGB);
    var artboard = doc.artboards[0];
    var artboardRect = artboard.artboardRect;

    var startLeft = artboardRect[0] + MARGIN_LEFT;
    var startTop = artboardRect[1] - MARGIN_TOP;

    var pngItem = doc.placedItems.add();
    pngItem.file = pngFile;
    pngItem.embed();
    if (pngItem.height !== 0) {
        var scale = (TARGET_HEIGHT / pngItem.height) * 100;
        pngItem.resize(scale, scale);
    }

    var epsItem = doc.placedItems.add();
    epsItem.file = epsFile;
    epsItem.embed();
    if (epsItem.height !== 0) {
        var scale2 = (TARGET_HEIGHT / epsItem.height) * 100;
        epsItem.resize(scale2, scale2);
    }

    // Position side by side, top aligned
    pngItem.top = startTop;
    pngItem.left = startLeft;
    epsItem.top = startTop;
    epsItem.left = pngItem.left + pngItem.width + GAP;

    // 2. EXPAND ARTBOARD TO FIT
    var boundsLeft = pngItem.left;
    var boundsTop = startTop;
    var boundsRight = epsItem.left + epsItem.width;
    var boundsBottom = startTop - TARGET_HEIGHT;

    artboard.artboardRect = [boundsLeft - 50, boundsTop + 50, boundsRight + 50, boundsBottom - 50];

    // 3. SELECT AND ZOOM
    doc.selection = [pngItem, epsItem];
    app.executeMenuCommand('fitinwindow');

    alert("Images placed and artboard adjusted.");
})();
