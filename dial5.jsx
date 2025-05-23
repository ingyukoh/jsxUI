// Illustrator JSX script – place PNG and EPS side by side with same height (auto-load files)
// ----------------------------------------------------------------------
// • Automatically loads PatCol.png and PatBlk.eps from the script folder
// • Drops them into the active document (or a new RGB doc if none exists).
// • Resizes both to have the same height (TARGET_HEIGHT).
// • Places them side by side with a horizontal gap.
// • Logs detailed debug information to log.txt in the same folder
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
        logFile.writeln("=== DIAL5.JSX DEBUG LOG ===");
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
    
    function logItemBounds(item, itemName) {
        log(itemName + " bounds:");
        log("  - geometricBounds: [" + item.geometricBounds + "]");
        log("  - visibleBounds: [" + item.visibleBounds + "]");
        log("  - position: [" + item.position + "]");
        log("  - top: " + item.top);
        log("  - left: " + item.left);
        log("  - width: " + item.width);
        log("  - height: " + item.height);
    }
    
    function logArtboardInfo() {
        if (doc.artboards.length > 0) {
            var ab = doc.artboards[0];
            var abRect = ab.artboardRect;
            log("Artboard info:");
            log("  - Name: " + ab.name);
            log("  - artboardRect: [" + abRect + "]");
            log("  - Left: " + abRect[0]);
            log("  - Top: " + abRect[1]);
            log("  - Right: " + abRect[2]);
            log("  - Bottom: " + abRect[3]);
            log("  - Width: " + (abRect[2] - abRect[0]));
            log("  - Height: " + (abRect[1] - abRect[3]));
        }
    }
    
    try {
        initLog();
        
        // ==== SETTINGS =====================================================
        var TARGET_HEIGHT = 400;          // points  (72 pt ≈ 1 inch)
        var HORIZONTAL_GAP = 20;          // horizontal gap between the two items
        var MARGIN_FROM_TOP = 50;         // margin from top of artboard
        var MARGIN_FROM_LEFT = 50;        // margin from left of artboard
        
        log("Settings:");
        log("  - TARGET_HEIGHT: " + TARGET_HEIGHT + " points");
        log("  - HORIZONTAL_GAP: " + HORIZONTAL_GAP + " points");
        log("  - MARGIN_FROM_TOP: " + MARGIN_FROM_TOP + " points");
        log("  - MARGIN_FROM_LEFT: " + MARGIN_FROM_LEFT + " points");
        log("");

        // ==== AUTO-LOAD FILES ==============================================
        log("Auto-loading files from script folder...");
        
        var pngFile = new File(scriptFolder + "/PatCol.png");
        var epsFile = new File(scriptFolder + "/PatBlk.eps");
        
        log("Checking file existence:");
        log("  - PNG file: " + pngFile.fsName);
        log("  - PNG exists: " + pngFile.exists);
        log("  - EPS file: " + epsFile.fsName);
        log("  - EPS exists: " + epsFile.exists);
        
        if (!pngFile.exists) {
            log("ERROR: PatCol.png not found in script folder");
            alert("Error: PatCol.png not found in " + scriptFolder.fsName);
            closeLog();
            return;
        }
        
        if (!epsFile.exists) {
            log("ERROR: PatBlk.eps not found in script folder");
            alert("Error: PatBlk.eps not found in " + scriptFolder.fsName);
            closeLog();
            return;
        }
        
        log("Both files found successfully");
        log("");

        // ==== DOCUMENT =====================================================
        log("Document setup:");
        log("  - Number of open documents: " + app.documents.length);
        
        var doc = app.documents.length ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB);
        
        if (app.documents.length) {
            log("  - Using existing document: " + doc.name);
            log("  - Document color mode: " + doc.documentColorSpace);
        } else {
            log("  - Created new RGB document");
        }
        
        log("  - Document dimensions: " + doc.width + " x " + doc.height + " points");
        log("  - Number of artboards: " + doc.artboards.length);
        logArtboardInfo();
        log("");

        // Get artboard bounds for positioning
        var abRect = doc.artboards[0].artboardRect;
        var artboardTop = abRect[1];
        var artboardLeft = abRect[0];

        // ==== PLACE & SCALE PNG ===========================================
        log("Placing PNG file...");
        var pngItem = doc.placedItems.add();
        log("  - PlacedItem created");
        
        pngItem.file = pngFile;
        log("  - File assigned to PlacedItem");
        
        log("PNG initial state after placement:");
        logItemBounds(pngItem, "PNG");
        
        pngItem.embed();
        log("  - PNG embedded");
        
        log("PNG state after embedding:");
        logItemBounds(pngItem, "PNG");

        if (pngItem.height !== 0) {
            var pngScale = (TARGET_HEIGHT / pngItem.height) * 100; // percent
            log("PNG scaling calculation:");
            log("  - Original height: " + pngItem.height);
            log("  - Target height: " + TARGET_HEIGHT);
            log("  - Scale factor: " + pngScale + "%");
            
            pngItem.resize(pngScale, pngScale); // uniform scaling
            log("  - PNG resized");
            
            log("PNG final state after scaling:");
            logItemBounds(pngItem, "PNG");
        } else {
            log("WARNING: PNG height is 0, skipping resize");
        }
        log("");

        // ==== PLACE & SCALE EPS ===========================================
        log("Placing EPS file...");
        var epsItem = doc.placedItems.add();
        log("  - PlacedItem created");
        
        epsItem.file = epsFile;
        log("  - File assigned to PlacedItem");
        
        log("EPS initial state after placement:");
        logItemBounds(epsItem, "EPS");
        
        epsItem.embed();
        log("  - EPS embedded");
        
        log("EPS state after embedding:");
        logItemBounds(epsItem, "EPS");

        if (epsItem.height !== 0) {
            var epsScale = (TARGET_HEIGHT / epsItem.height) * 100;
            log("EPS scaling calculation:");
            log("  - Original height: " + epsItem.height);
            log("  - Target height: " + TARGET_HEIGHT);
            log("  - Scale factor: " + epsScale + "%");
            
            epsItem.resize(epsScale, epsScale);
            log("  - EPS resized");
            
            log("EPS state after scaling:");
            logItemBounds(epsItem, "EPS");
        } else {
            log("WARNING: EPS height is 0, skipping resize");
        }
        log("");

        // ==== POSITIONING ==================================================
        log("Positioning items side by side:");
        
        // Position PNG at left with margin
        pngItem.top = artboardTop - MARGIN_FROM_TOP;
        pngItem.left = artboardLeft + MARGIN_FROM_LEFT;
        
        log("  - PNG positioned at:");
        log("    - top: " + pngItem.top);
        log("    - left: " + pngItem.left);
        
        // Position EPS to the right of PNG with gap
        epsItem.top = artboardTop - MARGIN_FROM_TOP; // same top as PNG
        epsItem.left = pngItem.left + pngItem.width + HORIZONTAL_GAP;
        
        log("  - EPS positioned at:");
        log("    - top: " + epsItem.top);
        log("    - left: " + epsItem.left);
        
        log("Final layout:");
        log("  - Total width used: " + (epsItem.left + epsItem.width - pngItem.left) + " points");
        log("  - Horizontal gap: " + (epsItem.left - (pngItem.left + pngItem.width)) + " points");
        log("  - Height alignment: " + (pngItem.height == epsItem.height ? "MATCHED" : "DIFFERENT"));
        
        log("");
        log("Final item states:");
        logItemBounds(pngItem, "PNG");
        log("");
        logItemBounds(epsItem, "EPS");
        
        // Check if items are on artboard
        log("");
        log("Artboard placement check:");
        var pngOnArtboard = (pngItem.left >= abRect[0] && 
                            (pngItem.left + pngItem.width) <= abRect[2] && 
                            pngItem.top <= abRect[1] && 
                            (pngItem.top - pngItem.height) >= abRect[3]);
        var epsOnArtboard = (epsItem.left >= abRect[0] && 
                            (epsItem.left + epsItem.width) <= abRect[2] && 
                            epsItem.top <= abRect[1] && 
                            (epsItem.top - epsItem.height) >= abRect[3]);
        
        log("  - PNG on artboard: " + pngOnArtboard);
        log("  - EPS on artboard: " + epsOnArtboard);
        
        if (!pngOnArtboard || !epsOnArtboard) {
            log("WARNING: One or both items extend beyond artboard bounds!");
            log("  - Artboard width: " + (abRect[2] - abRect[0]));
            log("  - Required width: " + (epsItem.left + epsItem.width - artboardLeft));
        }

        // ==== DONE =========================================================
        log("");
        log("SUCCESS: Artwork placed side by side with same height");
        alert("Files loaded and placed automatically. Check log.txt for details.");

    } catch (e) {
        log("ERROR: " + e.toString());
        log("Error stack: " + e.stack);
        alert("Error: " + e);
    } finally {
        closeLog();
    }
})();