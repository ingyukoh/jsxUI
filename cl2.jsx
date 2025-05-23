// Illustrator JSX script – place PatCol.png at half size with logging
// ----------------------------------------------------------------------
// • Creates a new document with artboard size 200 x 500 mm
// • Automatically loads PatCol.png from the script folder
// • Scales PNG to approximately 1/2 of its original size
// • Centers the PNG on the artboard
// • Logs detailed information to log.txt
// ----------------------------------------------------------------------
// Usage: File ▶ Scripts ▶ Other Script…
// ----------------------------------------------------------------------

#target illustrator

(function () {
    // ==== LOGGING SETUP ================================================
    var logFile;
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    
    function initLog() {
        logFile = new File(scriptFolder + "/log.txt");
        logFile.open("w");
        logFile.writeln("=== CL2.JSX LOG ===");
        logFile.writeln("Script started: " + new Date().toString());
        logFile.writeln("Script folder: " + scriptFolder.fsName);
        logFile.writeln("");
    }
    
    function log(message) {
        if (logFile) {
            logFile.writeln("[" + new Date().toTimeString().split(" ")[0] + "] " + message);
        }
    }
    
    function closeLog() {
        if (logFile) {
            logFile.writeln("");
            logFile.writeln("Script completed: " + new Date().toString());
            logFile.close();
        }
    }
    
    try {
        initLog();
        
        // ==== SETTINGS =====================================================
        // Convert mm to points (1 mm = 2.834645669 points)
        var MM_TO_PT = 2.834645669;
        var ARTBOARD_WIDTH_MM = 200;
        var ARTBOARD_HEIGHT_MM = 500;
        var ARTBOARD_WIDTH = ARTBOARD_WIDTH_MM * MM_TO_PT;   // 566.929 points
        var ARTBOARD_HEIGHT = ARTBOARD_HEIGHT_MM * MM_TO_PT; // 1417.323 points
        
        // Target size for PNG
        var TARGET_WIDTH_MM = 30;
        var TARGET_HEIGHT_MM = 60;
        var TARGET_WIDTH = TARGET_WIDTH_MM * MM_TO_PT;   // 85.039 points
        var TARGET_HEIGHT = TARGET_HEIGHT_MM * MM_TO_PT; // 170.079 points
        
        // Position offset from top-left
        var TOP_LEFT_MARGIN = 10 * MM_TO_PT; // 10mm margin from edges
        
        log("Settings:");
        log("  - Artboard size: " + ARTBOARD_WIDTH_MM + " x " + ARTBOARD_HEIGHT_MM + " mm");
        log("  - Artboard size in points: " + ARTBOARD_WIDTH.toFixed(3) + " x " + ARTBOARD_HEIGHT.toFixed(3));
        log("  - Target PNG size: " + TARGET_WIDTH_MM + " x " + TARGET_HEIGHT_MM + " mm");
        log("  - Target PNG size in points: " + TARGET_WIDTH.toFixed(3) + " x " + TARGET_HEIGHT.toFixed(3));
        log("  - Top-left margin: " + (TOP_LEFT_MARGIN/MM_TO_PT).toFixed(1) + " mm");
        log("");
        
        // ==== AUTO-LOAD FILE ===============================================
        log("Loading file...");
        var pngFile = new File(scriptFolder + "/PatCol.png");
        log("  - PNG path: " + pngFile.fsName);
        log("  - File exists: " + pngFile.exists);
        
        if (!pngFile.exists) {
            log("ERROR: PatCol.png not found");
            alert("Error: PatCol.png not found in " + scriptFolder.fsName);
            closeLog();
            return;
        }
        log("");
        
        // ==== CREATE NEW DOCUMENT ==========================================
        log("Creating new document...");
        var doc = app.documents.add(
            DocumentColorSpace.RGB,
            ARTBOARD_WIDTH,
            ARTBOARD_HEIGHT
        );
        log("  - Document created");
        log("  - Color mode: RGB");
        log("  - Document dimensions: " + doc.width + " x " + doc.height + " points");
        
        // Set artboard name
        doc.artboards[0].name = "PatCol Artboard";
        log("  - Artboard name: " + doc.artboards[0].name);
        
        // Log artboard info
        var abRect = doc.artboards[0].artboardRect;
        log("  - Artboard rect: [" + abRect + "]");
        log("");
        
        // ==== PLACE PNG ====================================================
        log("Placing PNG...");
        var pngItem = doc.placedItems.add();
        pngItem.file = pngFile;
        log("  - PlacedItem created");
        log("  - File assigned");
        
        log("PNG initial state:");
        log("  - Position: [" + pngItem.position + "]");
        log("  - Width: " + pngItem.width);
        log("  - Height: " + pngItem.height);
        log("  - Top: " + pngItem.top);
        log("  - Left: " + pngItem.left);
        
        pngItem.embed(); // Embed to get accurate dimensions
        log("  - PNG embedded");
        
        log("PNG after embedding:");
        log("  - Width: " + pngItem.width);
        log("  - Height: " + pngItem.height);
        log("");
        
        // ==== CALCULATE AND APPLY SCALING ==================================
        log("Calculating scale to achieve target size...");
        log("  - Original size: " + pngItem.width + " x " + pngItem.height);
        log("  - Aspect ratio: " + (pngItem.width / pngItem.height).toFixed(3));
        
        // Calculate scale based on which dimension needs more reduction
        var scaleX = (TARGET_WIDTH / pngItem.width) * 100;
        var scaleY = (TARGET_HEIGHT / pngItem.height) * 100;
        var finalScale = Math.min(scaleX, scaleY); // Use smaller scale to maintain aspect ratio
        
        log("  - Scale X needed: " + scaleX.toFixed(3) + "%");
        log("  - Scale Y needed: " + scaleY.toFixed(3) + "%");
        log("  - Final scale to use: " + finalScale.toFixed(3) + "%");
        
        pngItem.resize(finalScale, finalScale);
        
        log("  - New size: " + pngItem.width.toFixed(3) + " x " + pngItem.height.toFixed(3));
        log("  - New size in mm: " + (pngItem.width/MM_TO_PT).toFixed(1) + " x " + (pngItem.height/MM_TO_PT).toFixed(1) + " mm");
        log("");
        
        // ==== POSITION AT TOP-LEFT =========================================
        log("Positioning at top-left of artboard...");
        // Position at top-left with margin
        var newLeft = abRect[0] + TOP_LEFT_MARGIN;
        var newTop = abRect[1] - TOP_LEFT_MARGIN;
        pngItem.position = [newLeft, newTop];
        
        log("  - Artboard top-left: (" + abRect[0] + ", " + abRect[1] + ")");
        log("  - Margin: " + (TOP_LEFT_MARGIN/MM_TO_PT).toFixed(1) + " mm (" + TOP_LEFT_MARGIN.toFixed(3) + " points)");
        log("  - PNG position set to: [" + newLeft.toFixed(3) + ", " + newTop.toFixed(3) + "]");
        log("");
        
        // ==== FINAL STATE ==================================================
        log("Final PNG state:");
        log("  - Position: [" + pngItem.position[0].toFixed(3) + ", " + pngItem.position[1].toFixed(3) + "]");
        log("  - Size: " + pngItem.width.toFixed(3) + " x " + pngItem.height.toFixed(3));
        log("  - Bounds: [" + pngItem.left.toFixed(3) + ", " + pngItem.top.toFixed(3) + ", " + 
            (pngItem.left + pngItem.width).toFixed(3) + ", " + (pngItem.top - pngItem.height).toFixed(3) + "]");
        
        // Check if it fits on artboard
        var fitsOnArtboard = (pngItem.left >= abRect[0] && 
                             (pngItem.left + pngItem.width) <= abRect[2] && 
                             pngItem.top <= abRect[1] && 
                             (pngItem.top - pngItem.height) >= abRect[3]);
        log("  - Fits on artboard: " + fitsOnArtboard);
        
        // ==== DONE =========================================================
        log("");
        log("SUCCESS: PatCol.png placed at top-left");
        alert("PatCol.png resized to ~" + TARGET_WIDTH_MM + " x " + TARGET_HEIGHT_MM + " mm and placed at top-left of " + ARTBOARD_WIDTH_MM + " x " + ARTBOARD_HEIGHT_MM + " mm artboard");

    } catch (e) {
        log("ERROR: " + e.toString());
        alert("Error: " + e);
    } finally {
        closeLog();
    }
})();