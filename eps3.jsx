// eps2_fixed.jsx – place PatBlk.eps twice, side‑by‑side, 40 mm × 80 mm max, 10 mm gap
// ------------------------------------------------------------------------------------
//  ✓ New 200 mm × 500 mm artboard (units = millimetres)
//  ✓ Both copies scaled with identical factor so neither exceeds 40 mm × 80 mm
//  ✓ 10 mm margin from top‑left, 10 mm separation between copies
//  ✓ Labels under each copy, plus an info line
// ------------------------------------------------------------------------------------
#target illustrator

(function () {
    // -------- CONSTANTS --------------------------------------------------------------
    var ART_W = 200;    // mm
    var ART_H = 500;    // mm

    var TARGET_W = 40;  // mm (max)
    var TARGET_H = 80;  // mm (max)

    var MARGIN   = 10;  // mm – margin from top‑left for first copy
    var GAP      = 10;  // mm – space between the two copies
    var LABEL_GAP = 5;  // mm – gap between artwork and its label

    function mm2pt(mm){ return mm * 2.83464567; }

    // -------- CREATE DOCUMENT --------------------------------------------------------
    var preset   = new DocumentPreset();
    preset.units = RulerUnits.Millimeters; // width & height now expect mm
    preset.width  = ART_W;
    preset.height = ART_H;

    var doc = app.documents.addDocument('Print', preset);
    doc.rulerUnits = RulerUnits.Millimeters;

    // -------- LOCATE EPS -------------------------------------------------------------
    var epsFile = new File(File($.fileName).parent + '/PatBlk.eps');
    if (!epsFile.exists){ alert('PatBlk.eps not found'); return; }

    // -------- HELPER – PLACE & SCALE ONE COPY ----------------------------------------
    function placeScaledCopy() {
        var it = doc.placedItems.add();
        it.file = epsFile;
        it.embed();

        var sW = TARGET_W / it.width  * 100;   // percentage
        var sH = TARGET_H / it.height * 100;
        var s  = Math.min(sW, sH);
        it.resize(s, s, true); // changePositions = true so anchor stays top‑left
        return it; // scaled, embedded copy
    }

    // -------- FIRST COPY -------------------------------------------------------------
    var leftCopy = placeScaledCopy();
    leftCopy.left = MARGIN;                         // mm (because rulerUnits = mm)
    leftCopy.top  = ART_H - MARGIN;                 // y‑axis goes down, so top = artHeight - margin

    var label1 = doc.textFrames.add();
    label1.contents = epsFile.name + ' (1)';
    label1.textRange.characterAttributes.size = 10; // pt
    label1.left = leftCopy.left;
    label1.top  = leftCopy.top - leftCopy.height - LABEL_GAP;

    // -------- SECOND COPY ------------------------------------------------------------
    var rightCopy = placeScaledCopy();
    rightCopy.left = leftCopy.left + leftCopy.width + GAP;
    rightCopy.top  = leftCopy.top;

    var label2 = doc.textFrames.add();
    label2.contents = epsFile.name + ' (2)';
    label2.textRange.characterAttributes.size = 10;
    label2.left = rightCopy.left;
    label2.top  = rightCopy.top - rightCopy.height - LABEL_GAP;

    // -------- INFO LINE --------------------------------------------------------------
    var info = doc.textFrames.add();
    var totalW = (rightCopy.left + rightCopy.width) - leftCopy.left;
    info.contents = 'Total width: ' + totalW.toFixed(1) + ' mm  |  '
                  + 'Each copy: ' + leftCopy.width.toFixed(1) + ' × '
                  + leftCopy.height.toFixed(1) + ' mm  |  Gap: ' + GAP + ' mm';
    info.textRange.characterAttributes.size = 8;
    info.left = MARGIN;
    info.top  = label1.top - LABEL_GAP * 2;

    // -------- FINISH -----------------------------------------------------------------
    doc.selection = [leftCopy, rightCopy];
    try { app.executeMenuCommand('fitinwindow'); } catch(e){}
})();
