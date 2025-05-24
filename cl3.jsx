// bulletproof_place.jsx – put PatCol.png at exactly 30 mm × 60 mm in a 200 mm × 500 mm artboard
// -------------------------------------------------------------------------------------------
// • Creates a fresh RGB document sized 200 mm × 500 mm (portrait).
// • Places PatCol.png from the script’s folder.
// • Scales it so its *height* is 60 mm and its *width* is 30 mm (distorts if aspect≠desired).
//   — If you want to preserve aspect‑ratio, comment one of the two assignments below.
// • Anchors the artwork 10 mm from the artboard’s top‑left corner.
// -------------------------------------------------------------------------------------------

#target illustrator

(function () {
    // ========== CONSTANTS ===============================================================
    var ART_W_MM       = 200;   // artboard width  (mm)
    var ART_H_MM       = 500;   // artboard height (mm)
    var PNG_W_MM       = 30;    // final png width  (mm)
    var PNG_H_MM       = 60;    // final png height (mm)
    var MARGIN_MM      = 10;    // distance from top & left edges (mm)

    // ========== HELPERS =================================================================
    function mm2pt(mm) { return mm * 2.83464567; }  // 1 mm ≈ 2.8346 pt

    // ========== PREP DOC ================================================================
    var doc = app.documents.add(DocumentColorSpace.RGB,
                                mm2pt(ART_W_MM),   // width  in points
                                mm2pt(ART_H_MM));  // height in points
    var art = doc.artboards[0];

    // ========== LOCATE THE PNG ==========================================================
    var scriptFile = new File($.fileName);
    var pngFile    = new File(scriptFile.parent + "/PatCol.png");
    if (!pngFile.exists) {
        alert("PatCol.png not found next to the script.");
        return;
    }

    // ========== PLACE & FORCE‑SCALE =====================================================
    var item = doc.placedItems.add();
    item.file = pngFile;
    item.embed();                 // ensure we can alter dimensions reliably

    // --- exact dimensions --------------------------------------------------------------
    item.width  = mm2pt(PNG_W_MM);   // set width first …
    item.height = mm2pt(PNG_H_MM);   // … then height (may distort)

    // --- anchor 10 mm from top‑left -----------------------------------------------------
    item.left = mm2pt(MARGIN_MM);
    // Illustrator’s y‑axis goes *down*, so top is artboardRect[1]
    var topEdge = art.artboardRect[1] - mm2pt(MARGIN_MM);
    item.top = topEdge;

    // ========== DONE ====================================================================
    doc.selection = [item];
    try { app.executeMenuCommand('fitinwindow'); } catch (e) {}
    alert("PNG placed at 30 mm × 60 mm, 10 mm from corner.");
})();
