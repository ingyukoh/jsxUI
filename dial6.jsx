#target illustrator

(function () {
    // Automatically place PatCol.png and PatBlk.eps next to each other
    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;

    var pngFile = new File(folder + "/PatCol.png");
    var epsFile = new File(folder + "/PatBlk.eps");

    if (!pngFile.exists || !epsFile.exists) {
        alert("Required files not found in " + folder.fsName);
        return;
    }

    var TARGET_HEIGHT = 400;   // desired height in points
    var GAP = 20;              // horizontal gap between items

    // Create new doc if none open
    var doc = app.documents.length ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB);
    var abRect = doc.artboards[0].artboardRect;
    var startTop = abRect[1] - 50;  // margin from top
    var startLeft = abRect[0] + 50; // margin from left

    // === Place PNG ===
    var pngItem = doc.placedItems.add();
    pngItem.file = pngFile;
    pngItem.embed();                 // ensure width/height available
    if (pngItem.height !== 0) {
        var scale = TARGET_HEIGHT / pngItem.height * 100;
        pngItem.resize(scale, scale);
    }

    // === Place EPS ===
    var epsItem = doc.placedItems.add();
    epsItem.file = epsFile;
    epsItem.embed();
    if (epsItem.height !== 0) {
        var scale2 = TARGET_HEIGHT / epsItem.height * 100;
        epsItem.resize(scale2, scale2);
    }

    // === Position side by side ===
    pngItem.top = startTop;
    pngItem.left = startLeft;

    epsItem.top = startTop;
    epsItem.left = pngItem.left + pngItem.width + GAP;

    alert("Images placed side by side.");
})();
