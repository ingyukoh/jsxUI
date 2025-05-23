// Illustrator JSX script – place a PNG and an EPS at the same visual width
// ----------------------------------------------------------------------
// • Prompts you to pick the colour PNG first, then the black-line EPS.
// • Drops them into the active document (or a new RGB doc if none exists).
// • Resizes both so their *visible* width equals TARGET_WIDTH points.
// • Stacks the EPS under the PNG with a small gap.
// ----------------------------------------------------------------------
// Usage: File ▶ Scripts ▶ Other Script…
// ----------------------------------------------------------------------

#target illustrator

(function () {
    try {
        // ==== SETTINGS =====================================================
        var TARGET_WIDTH = 400;           // points  (72 pt ≈ 1 inch)
        var GAP          = 50;            // vertical gap between the two items

        // ==== PICK FILES ===================================================
        var pngFile = File.openDialog("Select the colour PNG",   "*.png", false);
        if (!pngFile) { alert("Cancelled – no PNG chosen."); return; }

        var epsFile = File.openDialog("Select the black EPS", "*.eps", false);
        if (!epsFile) { alert("Cancelled – no EPS chosen.");  return; }

        // ==== DOCUMENT =====================================================
        var doc = app.documents.length ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB);

        // ==== PLACE & SCALE PNG ===========================================
        var pngItem = doc.placedItems.add();
        pngItem.file = pngFile;   // placing happens immediately at 100 %
        pngItem.embed();          // optional – lets us read width reliably

        if (pngItem.width !== 0) {
            var s = (TARGET_WIDTH / pngItem.width) * 100; // percent
            pngItem.resize(s, s);                         // uniform scaling
        }

        // ==== PLACE & SCALE EPS ===========================================
        var epsItem = doc.placedItems.add();
        epsItem.file = epsFile;
        epsItem.embed();

        if (epsItem.width !== 0) {
            var s2 = (TARGET_WIDTH / epsItem.width) * 100;
            epsItem.resize(s2, s2);
        }

        // ==== POSITIONING ==================================================
        epsItem.top  = pngItem.top  - pngItem.height - GAP; // under PNG
        epsItem.left = pngItem.left;                       // same x-origin

        // ==== DONE =========================================================
        alert("Artwork placed and scaled.");

    } catch (e) {
        alert("Error: " + e);
    }
})();