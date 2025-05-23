#target illustrator

(function () {
    // Automatically open PatCol.png on a 200 mm x 500 mm artboard
    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    var pngFile = new File(folder + "/PatCol.png");

    if (!pngFile.exists) {
        alert("PatCol.png not found in " + folder.fsName);
        return;
    }

    var MM_TO_PT = 2.83464567;
    var widthPt = 200 * MM_TO_PT;
    var heightPt = 500 * MM_TO_PT;

    var doc = app.documents.add(DocumentColorSpace.RGB, widthPt, heightPt);

    var item = doc.placedItems.add();
    item.file = pngFile;
    var abRect = doc.artboards[0].artboardRect;
    item.position = [abRect[0], abRect[1]];

    alert("PatCol.png placed on 200x500 mm artboard.");
})();
