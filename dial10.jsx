#target illustrator

(function () {
    var TARGET_HEIGHT = 400;           // Target height in points
    var GAP = 20;                     // Gap between items
    var MARGIN_TOP = 50;              // Margin from top
    var MARGIN_LEFT = 50;             // Margin from left

    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    
    var pngFile = new File(folder + "/PatCol.png");
    var epsFile = new File(folder + "/PatBlk.eps");

    if (!pngFile.exists || !epsFile.exists) {
        alert("Required files not found in " + folder.fsName);
        return;
    }

    // Create new RGB document
    var doc = app.documents.add(DocumentColorSpace.RGB);
    var artboard = doc.artboards[0];
    var artboardRect = artboard.artboardRect;
    var startLeft = artboardRect[0] + MARGIN_LEFT;
    var startTop = artboardRect[1] - MARGIN_TOP;

    // === PLACE PNG ===
    var pngItem = doc.placedItems.add();
    pngItem.file = pngFile;
    pngItem.embed();
    
    // Scale PNG to target height
    if (pngItem.height !== 0) {
        var scale = (TARGET_HEIGHT / pngItem.height) * 100;
        pngItem.resize(scale, scale);
    }
    
    // Position PNG
    pngItem.left = startLeft;
    pngItem.top = startTop;
    
    // CRITICAL: Force Illustrator to recalculate bounds after positioning
    app.redraw();
    var pngBounds = pngItem.geometricBounds;
    var pngActualWidth = pngBounds[2] - pngBounds[0]; // right - left

    // === PLACE EPS ===
    var epsItem = doc.placedItems.add();
    epsItem.file = epsFile;
    epsItem.embed();
    
    // Scale EPS to target height
    if (epsItem.height !== 0) {
        var scale2 = (TARGET_HEIGHT / epsItem.height) * 100;
        epsItem.resize(scale2, scale2);
    }
    
    // Position EPS to the RIGHT of PNG using actual calculated width
    epsItem.left = startLeft + pngActualWidth + GAP;
    epsItem.top = startTop;
    
    // Force final redraw
    app.redraw();
    
    // Select both items for visual confirmation
    doc.selection = [pngItem, epsItem];
    
    // Optional: Fit in window (commented out to avoid BKey error)
    // try { app.executeMenuCommand('fitinwindow'); } catch (e) {}
    
    alert("✅ PNG and EPS placed side by side successfully!");
})();