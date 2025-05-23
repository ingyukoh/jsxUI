#target illustrator

if (app.documents.length === 0) {
    alert("Please open a document.");
} else {
    var doc = app.activeDocument;

    // Place PNG
    var pngFile = File.openDialog("Select a PNG file");
    if (pngFile) {
        var placedPNG = doc.placedItems.add();
        placedPNG.file = pngFile;
        placedPNG.position = [100, -100]; // X, Y
    }

    // Place EPS
    var epsFile = File.openDialog("Select an EPS file");
    if (epsFile) {
        var placedEPS = doc.placedItems.add();
        placedEPS.file = epsFile;
        placedEPS.position = [300, -100]; // X, Y
    }

    alert("Files placed on the artboard.");
}
