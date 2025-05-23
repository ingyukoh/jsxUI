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

    // Always start with a clean new document
    var doc = app.documents.add(DocumentColorSpace.RGB);
    var artboard = doc.artboards[0];
    var artboardRect = artboard.artboardRect;

    var startLeft = artboardRect[0] + MARGIN_LEFT;
    var startTop = artboardRect[1] - MARGIN_TOP;

    // === PNG ===
    var pngItem = doc.placedItems.add();
    pngItem.file = pngFile;
    pngItem.embed();

    if (pngItem.height !== 0) {
        var scale = (TARGET_HEIGHT / pngItem.height) * 100;
        pngItem.resize(scale, scale);
    }

    // Force Illustrator to flush dimensions
    var pngWidth = pngItem.width;

    pngItem.left = startLeft;
    pngItem.top  = startTop;

    // === EPS ===
    var epsItem = doc.placedItems.add();
    epsItem.file = epsFile;
    epsItem.embed();

    if (epsItem.height !== 0) {
        var scale2 = (TARGET_HEIGHT / epsItem.height) * 100;
        epsItem.resize(scale2, scale2);
    }

    epsItem.left = startLeft + pngWidth + GAP;
    epsItem.top  = startTop;

    // Optional: auto select & zoom
    doc.selection = [pngItem, epsItem];
    // try { app.executeMenuCommand('fitinwindow'); } catch (e) {}

    alert("✅ PNG and EPS placed side by side.");
})();
