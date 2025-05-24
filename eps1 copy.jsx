// eps1.jsx - CORRECTED VERSION
// Opens a new document and places PatBlk.eps scaled to fit 40mm x 80mm
// Fixed Error 1243: removed incorrect preference call

function mmToPt(mm) {
    return mm * 2.834645669; // 1 mm = 2.834645669 points
}

// Create document preset with millimeter units (no global preference needed)
var docPreset = new DocumentPreset();
docPreset.units = RulerUnits.Millimeters;
docPreset.width = mmToPt(200);  // Convert mm to points for width
docPreset.height = mmToPt(500); // Convert mm to points for height

var doc = app.documents.addDocument('Print', docPreset);
doc.rulerUnits = RulerUnits.Millimeters; // Set ruler units on the document

var ab = doc.artboards[0];
ab.name = 'AB';
// artboardRect uses points, so convert mm to points
ab.artboardRect = [0, mmToPt(500), mmToPt(200), 0];

doc.artboards.setActiveArtboardIndex(0);

var imgPath = File(File($.fileName).parent + '/PatBlk.eps');
if (!imgPath.exists) {
    alert('Image file not found: ' + imgPath.fsName);
} else {
    var placed = doc.placedItems.add();
    placed.file = imgPath;
    placed.embed(); // Embed to get accurate dimensions

    // Scale proportionally to fit within 40 x 80 mm
    var targetWidth = mmToPt(40);
    var targetHeight = mmToPt(80);
    var scaleW = (targetWidth / placed.width) * 100;
    var scaleH = (targetHeight / placed.height) * 100;
    var scale = Math.min(scaleW, scaleH); // scale percentage

    placed.resize(scale, scale);
    
    // Position top left with small margin (convert mm to points)
    placed.position = [mmToPt(10), -mmToPt(10)];

    // Add text label with file name below the image
    var txt = doc.textFrames.add();
    txt.contents = imgPath.name;
    txt.textRange.characterAttributes.size = 10;
    txt.position = [
        placed.left,
        placed.top - placed.height - mmToPt(5) // 5 mm gap in points
    ];
}