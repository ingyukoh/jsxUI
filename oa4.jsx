#target illustrator

(function () {
    var MM_TO_PT = 72 / 25.4;

    var ARTBOARD_WIDTH_MM = 200;
    var ARTBOARD_HEIGHT_MM = 500;

    var ITEM_HEIGHT_MM = 60; // approximate height
    var GAP_MM = 10; // gap between items

    var MARGIN_TOP_MM = 20;
    var MARGIN_LEFT_MM = 10;
    var MARGIN_RIGHT_MM = 10;

    function mmToPt(mm) {
        return mm * MM_TO_PT;
    }

    var doc = app.documents.add(
        DocumentColorSpace.RGB,
        mmToPt(ARTBOARD_WIDTH_MM),
        mmToPt(ARTBOARD_HEIGHT_MM)
    );

    var abRect = doc.artboards[0].artboardRect;

    var topPos = abRect[1] - mmToPt(MARGIN_TOP_MM);
    var leftStart = abRect[0] + mmToPt(MARGIN_LEFT_MM);
    var rightLimit = abRect[2] - mmToPt(MARGIN_RIGHT_MM);

    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    var pngFile = new File(folder + "/PatCol.png");
    if (!pngFile.exists) {
        alert("PatCol.png not found in " + folder.fsName);
        return;
    }

    var sample = doc.placedItems.add();
    sample.file = pngFile;
    sample.embed();
    if (sample.height !== 0) {
        var scalePercent = (mmToPt(ITEM_HEIGHT_MM) / sample.height) * 100;
        sample.resize(scalePercent, scalePercent);
    }

    sample.top = topPos;
    sample.left = leftStart;
    addLabel(sample);

    var itemWidthPt = sample.width;
    var totalSpace = itemWidthPt + mmToPt(GAP_MM);
    var availableWidth = rightLimit - leftStart;
    var count = Math.floor((availableWidth + mmToPt(GAP_MM)) / totalSpace);
    if (count < 1) count = 1;

    for (var i = 1; i < count; i++) {
        var clone = sample.duplicate();
        clone.left = leftStart + i * totalSpace;
        addLabel(clone);
    }

    function addLabel(item) {
        var tf = doc.textFrames.add();
        tf.contents = "PatCol.png";
        tf.left = item.left;
        tf.top = item.top - item.height - mmToPt(5);
    }
})();
