// Illustrator JSX script – place a PNG and an EPS at the same visual width with detailed logging
// ----------------------------------------------------------------------
// • Prompts you to pick the colour PNG first, then the black-line EPS.
// • Drops them into the active document (or a new RGB doc if none exists).
// • Resizes both so their *visible* width equals TARGET_WIDTH points.
// • Stacks the EPS under the PNG with a small gap.
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
        logFile.writeln("=== DIAL3.JSX DEBUG LOG ===");
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
        var TARGET_WIDTH = 400;           // points  (72 pt ≈ 1 inch)
        var GAP          = 50;            // vertical gap between the two items
        
        log("Settings:");
        log("  - TARGET_WIDTH: " + TARGET_WIDTH + " points");
        log("  - GAP: " + GAP + " points");
        log("");

        // ==== PICK FILES ===================================================
        log("File selection started...");
        var pngFile = File.openDialog("Select the colour PNG", "*.png", false);
        if (!pngFile) { 
            log("ERROR: No PNG file selected - user cancelled");
            alert("Cancelled – no PNG chosen."); 
            closeLog();
            return; 
        }
        log("PNG file selected: " + pngFile.fsName);

        var epsFile = File.openDialog("Select the black EPS", "*.eps", false);
        if (!epsFile) { 
            log("ERROR: No EPS file selected - user cancelled");
            alert("Cancelled – no EPS chosen.");
            closeLog();
            return; 
        }
        log("EPS file selected: " + epsFile.fsName);
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

        // ==== PLACE & SCALE PNG ===========================================
        log("Placing PNG file...");
        var pngItem = doc.placedItems.add();
        log("  - PlacedItem created");
        
        pngItem.file = pngFile;   // placing happens immediately at 100%
        log("  - File assigned to PlacedItem");
        
        log("PNG initial state after placement:");
        logItemBounds(pngItem, "PNG");
        
        pngItem.embed();          // optional – lets us read width reliably
        log("  - PNG embedded");
        
        log("PNG state after embedding:");
        logItemBounds(pngItem, "PNG");

        if (pngItem.width !== 0) {
            var s = (TARGET_WIDTH / pngItem.width) * 100; // percent
            log("PNG scaling calculation:");
            log("  - Original width: " + pngItem.width);
            log("  - Target width: " + TARGET_WIDTH);
            log("  - Scale factor: " + s + "%");
            
            pngItem.resize(s, s);                         // uniform scaling
            log("  - PNG resized");
            
            log("PNG final state after scaling:");
            logItemBounds(pngItem, "PNG");
        } else {
            log("WARNING: PNG width is 0, skipping resize");
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

        if (epsItem.width !== 0) {
            var s2 = (TARGET_WIDTH / epsItem.width) * 100;
            log("EPS scaling calculation:");
            log("  - Original width: " + epsItem.width);
            log("  - Target width: " + TARGET_WIDTH);
            log("  - Scale factor: " + s2 + "%");
            
            epsItem.resize(s2, s2);
            log("  - EPS resized");
            
            log("EPS state after scaling:");
            logItemBounds(epsItem, "EPS");
        } else {
            log("WARNING: EPS width is 0, skipping resize");
        }
        log("");

        // ==== POSITIONING ==================================================
        log("Positioning items:");
        log("  - PNG bottom edge: " + (pngItem.top - pngItem.height));
        log("  - Desired EPS top: " + (pngItem.top - pngItem.height - GAP));
        
        epsItem.top  = pngItem.top  - pngItem.height - GAP; // under PNG
        epsItem.left = pngItem.left;                       // same x-origin
        
        log("  - EPS repositioned");
        log("Final positions:");
        log("  - PNG: top=" + pngItem.top + ", left=" + pngItem.left);
        log("  - EPS: top=" + epsItem.top + ", left=" + epsItem.left);
        log("  - Vertical gap: " + ((pngItem.top - pngItem.height) - epsItem.top) + " points");
        
        log("");
        log("Final item states:");
        logItemBounds(pngItem, "PNG");
        log("");
        logItemBounds(epsItem, "EPS");
        
        // Check if items are on artboard
        if (doc.artboards.length > 0) {
            var ab = doc.artboards[0];
            var abRect = ab.artboardRect;
            log("");
            log("Artboard placement check:");
            log("  - PNG on artboard: " + 
                (pngItem.left >= abRect[0] && 
                 (pngItem.left + pngItem.width) <= abRect[2] && 
                 pngItem.top <= abRect[1] && 
                 (pngItem.top - pngItem.height) >= abRect[3]));
            log("  - EPS on artboard: " + 
                (epsItem.left >= abRect[0] && 
                 (epsItem.left + epsItem.width) <= abRect[2] && 
                 epsItem.top <= abRect[1] && 
                 (epsItem.top - epsItem.height) >= abRect[3]));
        }

        // ==== DONE =========================================================
        log("");
        log("SUCCESS: Artwork placed and scaled");
        alert("Artwork placed and scaled. Check log.txt for details.");

    } catch (e) {
        log("ERROR: " + e.toString());
        log("Error stack: " + e.stack);
        alert("Error: " + e);
    } finally {
        closeLog();
    }
})();