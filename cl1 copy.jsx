// Illustrator JSX script – place PatCol.png alone on artboard
// ----------------------------------------------------------------------
// • Creates a new document with artboard size 200 x 500 mm
// • Automatically loads PatCol.png from the script folder
// • Centers the PNG on the artboard
// • Scales to fit within artboard with margins
// ----------------------------------------------------------------------
// Usage: File ▶ Scripts ▶ Other Script…
// ----------------------------------------------------------------------

#target illustrator

(function () {
    try {
        // ==== SETTINGS =====================================================
        // Convert mm to points (1 mm = 2.834645669 points)
        var MM_TO_PT = 2.834645669;
        var ARTBOARD_WIDTH_MM = 200;
        var ARTBOARD_HEIGHT_MM = 500;
        var ARTBOARD_WIDTH = ARTBOARD_WIDTH_MM * MM_TO_PT;   // 566.929 points
        var ARTBOARD_HEIGHT = ARTBOARD_HEIGHT_MM * MM_TO_PT; // 1417.323 points
        var MARGIN = 20 * MM_TO_PT; // 20mm margin on all sides
        
        // ==== GET SCRIPT FOLDER ============================================
        var scriptFile = new File($.fileName);
        var scriptFolder = scriptFile.parent;
        
        // ==== AUTO-LOAD FILE ===============================================
        var pngFile = new File(scriptFolder + "/PatCol.png");
        
        if (!pngFile.exists) {
            alert("Error: PatCol.png not found in " + scriptFolder.fsName);
            return;
        }
        
        // ==== CREATE NEW DOCUMENT ==========================================
        var doc = app.documents.add(
            DocumentColorSpace.RGB,
            ARTBOARD_WIDTH,
            ARTBOARD_HEIGHT
        );
        
        // Set artboard name
        doc.artboards[0].name = "PatCol Artboard";
        
        // ==== PLACE PNG ====================================================
        var pngItem = doc.placedItems.add();
        pngItem.file = pngFile;
        pngItem.embed(); // Embed to get accurate dimensions
        
        // ==== CALCULATE SCALING ============================================
        // Available space considering margins
        var availableWidth = ARTBOARD_WIDTH - (2 * MARGIN);
        var availableHeight = ARTBOARD_HEIGHT - (2 * MARGIN);
        
        // Calculate scale to fit within available space
        var scaleX = availableWidth / pngItem.width;
        var scaleY = availableHeight / pngItem.height;
        var scale = Math.min(scaleX, scaleY) * 100; // Use smaller scale to fit
        
        // Apply scaling
        if (scale < 100) {
            pngItem.resize(scale, scale);
        }
        
        // ==== CENTER ON ARTBOARD ===========================================
        // Get artboard bounds
        var abRect = doc.artboards[0].artboardRect;
        var abCenterX = (abRect[0] + abRect[2]) / 2;
        var abCenterY = (abRect[1] + abRect[3]) / 2;
        
        // Position PNG centered
        pngItem.position = [
            abCenterX - (pngItem.width / 2),
            abCenterY + (pngItem.height / 2)
        ];
        
        // ==== DONE =========================================================
        alert("PatCol.png placed on " + ARTBOARD_WIDTH_MM + " x " + ARTBOARD_HEIGHT_MM + " mm artboard");

    } catch (e) {
        alert("Error: " + e);
    }
})();