#target illustrator

(function () {
    // Create new 200 x 500 mm document and place PatCol.png with subtitle below
    try {
        // millimetres to points conversion
        var ptPerMM = 72 / 25.4; // 1 mm in points
        var widthMM  = 200;
        var heightMM = 500;
        var widthPt  = widthMM * ptPerMM;
        var heightPt = heightMM * ptPerMM;

        // create a new RGB document with specified size
        var doc = app.documents.add(DocumentColorSpace.RGB, widthPt, heightPt);
        var abRect = doc.artboards[0].artboardRect;

        // locate PatCol.png in same folder as script
        var scriptFile = new File($.fileName);
        var folder = scriptFile.parent;
        var pngFile = new File(folder + "/PatCol.png");
        if (!pngFile.exists) {
            alert("PatCol.png not found in " + folder.fsName);
            return;
        }

        // place the PNG on the artboard
        var pngItem = doc.placedItems.add();
        pngItem.file = pngFile;
        pngItem.embed(); // ensure width/height available

        // position near top-left with 20 mm margin
        var margin = 20 * ptPerMM;
        pngItem.top = abRect[1] - margin;
        pngItem.left = abRect[0] + margin;

        // add subtitle text below the PNG
        var textFrame = doc.textFrames.add();
        textFrame.contents = "PC alone";
        textFrame.textRange.characterAttributes.size = 24;
        textFrame.top = pngItem.top - pngItem.height - (10 * ptPerMM);
        textFrame.left = pngItem.left;
    } catch (e) {
        alert("Error: " + e);
    }
})();
