// eps7b.jsx - Enhanced version with comprehensive logging
// Opens a new document and places PatBlk.eps with detailed debug logging
// All alerts are logged with timestamps and numerical values

#target illustrator

// Simple test to verify script runs
alert("eps7b.jsx starting...");

(function () {
    // ==== LOGGING SETUP ================================================
    var logFile;
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var alertCount = 0;
    
    function initLog() {
        logFile = new File(scriptFolder + "/log.txt");
        logFile.open("w");
        logFile.writeln("=== EPS7B.JSX DEBUG LOG ===");
        logFile.writeln("Script started: " + new Date().toString());
        logFile.writeln("Script path: " + scriptFile.fsName);
        logFile.writeln("Script folder: " + scriptFolder.fsName);
        logFile.writeln("Illustrator version: " + app.version);
        logFile.writeln("");
    }
    
    function log(message) {
        if (logFile) {
            var timestamp = new Date();
            var timeStr = timestamp.toTimeString().split(" ")[0] + "." + timestamp.getMilliseconds();
            logFile.writeln("[" + timeStr + "] " + message);
        }
    }
    
    function logAlert(message) {
        alertCount++;
        log("ALERT #" + alertCount + ": " + message);
        alert(message);
    }
    
    function logNumeric(label, value, unit) {
        unit = unit || "";
        var numStr = (typeof value === "number") ? value.toFixed(3) : String(value);
        log("  " + label + ": " + numStr + (unit ? " " + unit : ""));
    }
    
    function logObject(obj, name) {
        log("Object details for " + name + ":");
        if (obj.position) logNumeric("  position", "[" + obj.position[0].toFixed(3) + ", " + obj.position[1].toFixed(3) + "]");
        if (obj.width !== undefined) logNumeric("  width", obj.width, "pt");
        if (obj.height !== undefined) logNumeric("  height", obj.height, "pt");
        if (obj.top !== undefined) logNumeric("  top", obj.top, "pt");
        if (obj.left !== undefined) logNumeric("  left", obj.left, "pt");
        if (obj.geometricBounds) {
            var gb = obj.geometricBounds;
            log("  geometricBounds: [" + gb[0].toFixed(3) + ", " + gb[1].toFixed(3) + ", " + 
                gb[2].toFixed(3) + ", " + gb[3].toFixed(3) + "]");
        }
    }
    
    function closeLog() {
        if (logFile) {
            log("");
            log("Total alerts shown: " + alertCount);
            logFile.writeln("");
            logFile.writeln("Script completed: " + new Date().toString());
            logFile.close();
        }
    }
    
    // ==== UTILITY FUNCTIONS ============================================
    function mmToPt(mm) {
        var conversion = 2.834645669;
        var result = mm * conversion;
        log("Convert: " + mm + " mm → " + result.toFixed(3) + " pt (factor: " + conversion + ")");
        return result;
    }
    
    function ptToMm(pt) {
        var conversion = 2.834645669;
        var result = pt / conversion;
        // Don't use .toFixed() on pt if it might not be a number
        var ptStr = (typeof pt === "number") ? pt.toFixed(3) : String(pt);
        log("Convert: " + ptStr + " pt → " + result.toFixed(3) + " mm");
        return result;
    }
    
    try {
        initLog();
        log("=== INITIALIZATION PHASE ===");
        
        // ==== SETTINGS =====================================================
        log("Defining settings...");
        var ARTBOARD_WIDTH_MM = 200;
        var ARTBOARD_HEIGHT_MM = 500;
        var TARGET_WIDTH_MM = 40;
        var TARGET_HEIGHT_MM = 80;
        var MARGIN_MM = 10;
        var SEPARATION_MM = 10;
        var LABEL_GAP_MM = 5;
        
        logNumeric("ARTBOARD_WIDTH_MM", ARTBOARD_WIDTH_MM, "mm");
        logNumeric("ARTBOARD_HEIGHT_MM", ARTBOARD_HEIGHT_MM, "mm");
        logNumeric("TARGET_WIDTH_MM", TARGET_WIDTH_MM, "mm");
        logNumeric("TARGET_HEIGHT_MM", TARGET_HEIGHT_MM, "mm");
        logNumeric("MARGIN_MM", MARGIN_MM, "mm");
        logNumeric("SEPARATION_MM", SEPARATION_MM, "mm");
        logNumeric("LABEL_GAP_MM", LABEL_GAP_MM, "mm");
        log("");
        
        // Convert to points
        log("Converting measurements to points...");
        var artboardWidthPt = mmToPt(ARTBOARD_WIDTH_MM);
        var artboardHeightPt = mmToPt(ARTBOARD_HEIGHT_MM);
        var targetWidthPt = mmToPt(TARGET_WIDTH_MM);
        var targetHeightPt = mmToPt(TARGET_HEIGHT_MM);
        var marginPt = mmToPt(MARGIN_MM);
        var separationPt = mmToPt(SEPARATION_MM);
        var labelGapPt = mmToPt(LABEL_GAP_MM);
        log("");
        
        // ==== CREATE DOCUMENT ==============================================
        log("=== DOCUMENT CREATION PHASE ===");
        log("Creating document preset...");
        var docPreset = new DocumentPreset();
        docPreset.units = RulerUnits.Millimeters;
        docPreset.width = artboardWidthPt;
        docPreset.height = artboardHeightPt;
        docPreset.colorMode = DocumentColorSpace.CMYK;
        
        logNumeric("docPreset.width", docPreset.width, "pt");
        logNumeric("docPreset.height", docPreset.height, "pt");
        log("docPreset.units: " + docPreset.units);
        log("docPreset.colorMode: " + docPreset.colorMode);
        
        log("Creating document...");
        var doc = app.documents.addDocument('Print', docPreset);
        doc.rulerUnits = RulerUnits.Millimeters;
        
        log("Document created successfully");
        logNumeric("doc.width", doc.width, "pt");
        logNumeric("doc.height", doc.height, "pt");
        log("doc.rulerUnits: " + doc.rulerUnits);
        log("doc.name: " + doc.name);
        log("");
        
        // ==== ARTBOARD SETUP ===============================================
        log("=== ARTBOARD SETUP PHASE ===");
        var ab = doc.artboards[0];
        ab.name = 'AB';
        var abRect = ab.artboardRect;
        
        log("Artboard details:");
        log("  name: " + ab.name);
        log("  artboardRect: [" + abRect[0].toFixed(3) + ", " + abRect[1].toFixed(3) + 
            ", " + abRect[2].toFixed(3) + ", " + abRect[3].toFixed(3) + "]");
        logNumeric("  width", abRect[2] - abRect[0], "pt");
        logNumeric("  height", abRect[1] - abRect[3], "pt");
        log("");
        
        // ==== FILE CHECK ===================================================
        log("=== FILE CHECK PHASE ===");
        var imgPath = File(scriptFolder + '/PatBlk.eps');
        log("Image path: " + imgPath.fsName);
        log("File exists: " + imgPath.exists);
        
        if (!imgPath.exists) {
            var errorMsg = 'Image file not found: ' + imgPath.fsName;
            log("ERROR: " + errorMsg);
            logAlert(errorMsg);
            closeLog();
            return;
        }
        log("File check passed");
        log("");
        
        // ==== PLACE FIRST IMAGE ============================================
        log("=== PLACING FIRST IMAGE ===");
        log("Creating placed item #1...");
        var placed1 = doc.placedItems.add();
        placed1.file = imgPath;
        log("File assigned to placed item #1");
        
        log("Initial state of placed1:");
        logObject(placed1, "placed1");
        
        log("Embedding placed1...");
        placed1.embed();
        
        log("State after embedding:");
        logObject(placed1, "placed1");
        
        // Calculate scaling
        log("Calculating scale for placed1...");
        var scaleW1 = (targetWidthPt / placed1.width) * 100;
        var scaleH1 = (targetHeightPt / placed1.height) * 100;
        var scale1 = Math.min(scaleW1, scaleH1);
        
        logNumeric("Original width", placed1.width, "pt");
        logNumeric("Original height", placed1.height, "pt");
        logNumeric("Target width", targetWidthPt, "pt");
        logNumeric("Target height", targetHeightPt, "pt");
        logNumeric("Scale W needed", scaleW1, "%");
        logNumeric("Scale H needed", scaleH1, "%");
        logNumeric("Final scale", scale1, "%");
        
        log("Applying scale to placed1...");
        placed1.resize(scale1, scale1);
        
        log("State after scaling:");
        logObject(placed1, "placed1");
        logNumeric("Width in mm", ptToMm(placed1.width), "mm");
        logNumeric("Height in mm", ptToMm(placed1.height), "mm");
        
        // Position first image
        log("Positioning placed1...");
        var pos1X = marginPt;
        var pos1Y = abRect[1] - marginPt;
        placed1.position = [pos1X, pos1Y];
        logNumeric("Position X", pos1X, "pt");
        logNumeric("Position Y", pos1Y, "pt");
        log("");
        
        // ==== PLACE SECOND IMAGE ===========================================
        log("=== PLACING SECOND IMAGE ===");
        log("Creating placed item #2...");
        var placed2 = doc.placedItems.add();
        placed2.file = imgPath;
        placed2.embed();
        
        log("Initial state of placed2:");
        logObject(placed2, "placed2");
        
        log("Applying same scale as placed1: " + scale1.toFixed(3) + "%");
        placed2.resize(scale1, scale1);
        
        log("State after scaling:");
        logObject(placed2, "placed2");
        
        // Position second image
        log("Positioning placed2...");
        var pos2X = placed1.left + placed1.width + separationPt;
        var pos2Y = placed1.top;
        placed2.position = [pos2X, pos2Y];
        logNumeric("Position X", pos2X, "pt");
        logNumeric("Position Y", pos2Y, "pt");
        logNumeric("Distance from placed1", pos2X - (placed1.left + placed1.width), "pt");
        log("");
        
        // ==== ADD LABELS ===================================================
        log("=== ADDING LABELS ===");
        
        // Label 1
        log("Creating text label #1...");
        var txt1 = doc.textFrames.add();
        txt1.contents = imgPath.name + " (1)";
        txt1.textRange.characterAttributes.size = 10;
        var txt1X = placed1.left;
        var txt1Y = placed1.top - placed1.height - labelGapPt;
        txt1.position = [txt1X, txt1Y];
        log("Label 1 content: " + txt1.contents);
        logNumeric("Label 1 position X", txt1X, "pt");
        logNumeric("Label 1 position Y", txt1Y, "pt");
        
        // Label 2
        log("Creating text label #2...");
        var txt2 = doc.textFrames.add();
        txt2.contents = imgPath.name + " (2)";
        txt2.textRange.characterAttributes.size = 10;
        var txt2X = placed2.left;
        var txt2Y = placed2.top - placed2.height - labelGapPt;
        txt2.position = [txt2X, txt2Y];
        log("Label 2 content: " + txt2.contents);
        logNumeric("Label 2 position X", txt2X, "pt");
        logNumeric("Label 2 position Y", txt2Y, "pt");
        log("");
        
        // ==== SUMMARY CALCULATIONS =========================================
        log("=== SUMMARY CALCULATIONS ===");
        var totalWidth = placed2.left + placed2.width - placed1.left;
        var totalWidthMm = ptToMm(totalWidth);
        var actualGap = placed2.left - (placed1.left + placed1.width);
        var actualGapMm = ptToMm(actualGap);
        
        logNumeric("Total width used", totalWidth, "pt");
        logNumeric("Total width in mm", totalWidthMm, "mm");
        logNumeric("Actual gap", actualGap, "pt");
        logNumeric("Actual gap in mm", actualGapMm, "mm");
        
        // Check if within artboard
        var withinBounds = (placed2.left + placed2.width) <= abRect[2];
        log("Fits within artboard: " + withinBounds);
        if (!withinBounds) {
            logNumeric("Overflow amount", (placed2.left + placed2.width) - abRect[2], "pt");
        }
        
        // ==== SUCCESS MESSAGE ==============================================
        log("");
        log("=== COMPLETION ===");
        var successMsg = "Successfully placed 2 images side by side\n" +
                        "Total width: " + totalWidthMm.toFixed(1) + " mm\n" +
                        "Gap: " + actualGapMm.toFixed(1) + " mm";
        logAlert(successMsg);
        
    } catch (e) {
        log("=== ERROR OCCURRED ===");
        log("ERROR: " + e.toString());
        log("Error line: " + e.line);
        log("Error file: " + e.fileName);
        log("Stack trace: " + e.stack);
        logAlert("Error: " + e.toString() + "\nSee log.txt for details");
    } finally {
        closeLog();
    }
})();