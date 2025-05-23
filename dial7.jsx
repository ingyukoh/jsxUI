#target illustrator

(function () {
    // Define configuration
    var TARGET_HEIGHT = 400;  // desired height in points for both images
    var GAP = 20;             // horizontal gap between the two images (points)
    var MARGIN_TOP = 50;      // top margin from artboard edge (points)
    var MARGIN_LEFT = 50;     // left margin from artboard edge (points)

    // Locate script folder and image files
    var scriptFile = new File($.fileName);
    var folder    = scriptFile.parent;
    var pngFile   = new File(folder + "/PatCol.png");
    var epsFile   = new File(folder + "/PatBlk.eps");

    // Verify the files exist
    if (!pngFile.exists || !epsFile.exists) {
        alert("Required files not found in " + folder.fsName);
        return;
    }

    // Use active document if one is open, otherwise create a new document
    var doc = app.documents.length ? app.activeDocument
                                   : app.documents.add(DocumentColorSpace.RGB);
    var artboard = doc.artboards[0];
    var artboardRect = artboard.artboardRect;  // [left, top, right, bottom] of the artboard

    // Calculate starting positions (with margins) on the artboard
    var startLeft = artboardRect[0] + MARGIN_LEFT;
    var startTop  = artboardRect[1] - MARGIN_TOP;

    // === Place and embed the PNG ===
    var pngItem = doc.placedItems.add();
    pngItem.file = pngFile;              // Link the PNG file to the placed item:contentReference[oaicite:5]{index=5}
    pngItem.embed();                    // Embed the PNG so we can get dimensions
    if (pngItem.height !== 0) {
        var scale = (TARGET_HEIGHT / pngItem.height) * 100;
        pngItem.resize(scale, scale);   // Scale PNG to target height (preserving width):contentReference[oaicite:6]{index=6}
    }

    // === Place and embed the EPS ===
    var epsItem = doc.placedItems.add();
    epsItem.file = epsFile;             
    epsItem.embed();                   
    if (epsItem.height !== 0) {
        var scale2 = (TARGET_HEIGHT / epsItem.height) * 100;
        epsItem.resize(scale2, scale2); // Scale EPS to target height (preserve aspect ratio)
    }

    // === Position the items side by side ===
    pngItem.top  = startTop; 
    pngItem.left = startLeft;  // Position PNG at the top-left margin

    epsItem.top  = startTop; 
    epsItem.left = pngItem.left + pngItem.width + GAP;  // Place EPS to the right of PNG with gap

    // (Optional) Ensure both images are within artboard bounds, adjust if necessary
    var artboardWidth  = artboardRect[2] - artboardRect[0];
    var artboardHeight = artboardRect[1] - artboardRect[3];
    var neededWidth  = (pngItem.left + pngItem.width + GAP + epsItem.width) - artboardRect[0] + MARGIN_LEFT;
    var neededHeight = TARGET_HEIGHT + MARGIN_TOP + 20;  // total height needed including some bottom margin
    if (neededWidth > artboardWidth || neededHeight > artboardHeight) {
        // Expand artboard to fit if required
        var newRight = artboardRect[0] + Math.max(artboardWidth, neededWidth);
        var newTop   = artboardRect[3] + Math.max(artboardHeight, neededHeight);
        artboard.artboardRect = [artboardRect[0], newTop, newRight, artboardRect[3]];
    }

    // Finished – you can remove the alert in production
    alert("Images placed side by side.");
})();
