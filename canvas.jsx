#target illustrator

// Ensure a document is open
if (app.documents.length === 0) {
    alert("Please open a document.");
} else {
    var doc = app.activeDocument;
    var abBounds = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;

    // Create the UI window
    var win = new Window("dialog", "Place Images");
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];

    // Display info
    win.add("statictext", undefined, "Click a button to place image:");

    // PNG Button
    var pngBtn = win.add("button", undefined, "Place PNG");
    pngBtn.onClick = function () {
        var pngFile = File.openDialog("Select a PNG file", "*.png");
        if (pngFile) {
            var placedPNG = doc.placedItems.add();
            placedPNG.file = pngFile;
            placedPNG.position = [abBounds[0] + 50, abBounds[1] - 50];
        }
    };

    // EPS Button
    var epsBtn = win.add("button", undefined, "Place EPS");
    epsBtn.onClick = function () {
        var epsFile = File.openDialog("Select an EPS file", "*.eps");
        if (epsFile) {
            var placedEPS = doc.placedItems.add();
            placedEPS.file = epsFile;
            placedEPS.position = [abBounds[0] + 200, abBounds[1] - 50];
        }
    };

    // Show window
    win.show();
}

==============
