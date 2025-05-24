// eps2.jsx - Display PatBlk.eps twice side by side
// Opens a new document and places PatBlk.eps twice, scaled to fit 40mm x 80mm each
// with 10mm separation between them

function mmToPt(mm) {
    return mm * 2.834645669; // 1 mm = 2.834645669 points
}

// Create document preset with millimeter units
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
    // Settings
    var targetWidth = mmToPt(40);
    var targetHeight = mmToPt(80);
    var margin = mmToPt(10);
    var separation = mmToPt(10);
    var labelGap = mmToPt(5);
    
    // ==== FIRST IMAGE (LEFT) ====================================
    var placed1 = doc.placedItems.add();
    placed1.file = imgPath;
    placed1.embed(); // Embed to get accurate dimensions

    // Scale proportionally to fit within 40 x 80 mm
    var scaleW1 = (targetWidth / placed1.width) * 100;
    var scaleH1 = (targetHeight / placed1.height) * 100;
    var scale1 = Math.min(scaleW1, scaleH1); // scale percentage

    placed1.resize(scale1, scale1);
    
    // Position first image at top left with margin
    placed1.position = [margin, -margin];

    // Add text label for first image
    var txt1 = doc.textFrames.add();
    txt1.contents = imgPath.name + " (1)";
    txt1.textRange.characterAttributes.size = 10;
    txt1.position = [
        placed1.left,
        placed1.top - placed1.height - labelGap
    ];
    
    // ==== SECOND IMAGE (RIGHT) ==================================
    var placed2 = doc.placedItems.add();
    placed2.file = imgPath;
    placed2.embed(); // Embed to get accurate dimensions

    // Scale proportionally to fit within 40 x 80 mm
    var scaleW2 = (targetWidth / placed2.width) * 100;
    var scaleH2 = (targetHeight / placed2.height) * 100;
    var scale2 = Math.min(scaleW2, scaleH2); // scale percentage

    placed2.resize(scale2, scale2);
    
    // Position second image to the right of first image with separation
    placed2.position = [
        placed1.left + placed1.width + separation,
        placed1.top  // Same top position as first image
    ];

    // Add text label for second image
    var txt2 = doc.textFrames.add();
    txt2.contents = imgPath.name + " (2)";
    txt2.textRange.characterAttributes.size = 10;
    txt2.position = [
        placed2.left,
        placed2.top - placed2.height - labelGap
    ];
    
    // ==== LOGGING/VERIFICATION ==================================
    // Calculate total width used
    var totalWidth = placed2.left + placed2.width - placed1.left;
    var totalWidthMm = totalWidth / 2.834645669;
    
    // Create info text at bottom
    var infoText = doc.textFrames.add();
    infoText.contents = "Total width: " + totalWidthMm.toFixed(1) + " mm | " +
                       "Each image: " + (placed1.width / 2.834645669).toFixed(1) + " x " + 
                       (placed1.height / 2.834645669).toFixed(1) + " mm | " +
                       "Gap: 10 mm";
    infoText.textRange.characterAttributes.size = 8;
    infoText.position = [
        margin,
        Math.min(txt1.top - labelGap * 3, txt2.top - labelGap * 3)
    ];
}