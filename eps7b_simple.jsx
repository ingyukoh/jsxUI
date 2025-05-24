// eps7b_simple.jsx - Simplified version with logging and alerts
// Places PatBlk.eps twice side by side with debug logging

#target illustrator

// Global variables
var logFile;
var scriptFolder;

// Initialize immediately
try {
    var scriptFile = new File($.fileName);
    scriptFolder = scriptFile.parent;
    
    // Create log file
    logFile = new File(scriptFolder + "/log.txt");
    logFile.open("w");
    logFile.writeln("=== EPS7B SIMPLE LOG ===");
    logFile.writeln("Started: " + new Date());
    
} catch (e) {
    alert("Failed to create log file: " + e);
}

// Simple logging function
function log(msg) {
    try {
        if (logFile) {
            logFile.writeln("[" + new Date().toTimeString().split(" ")[0] + "] " + msg);
        }
    } catch (e) {
        // Silent fail
    }
}

// Alert and log
function logAlert(msg) {
    log("ALERT: " + msg);
    alert(msg);
}

// Main execution
try {
    log("Script starting");
    
    // Conversion function
    function mmToPt(mm) {
        return mm * 2.834645669;
    }
    
    // Settings
    var TARGET_WIDTH_MM = 40;
    var TARGET_HEIGHT_MM = 80;
    log("Target size: " + TARGET_WIDTH_MM + " x " + TARGET_HEIGHT_MM + " mm");
    
    // Create document
    log("Creating document...");
    var docPreset = new DocumentPreset();
    docPreset.units = RulerUnits.Millimeters;
    docPreset.width = mmToPt(200);
    docPreset.height = mmToPt(500);
    
    var doc = app.documents.addDocument('Print', docPreset);
    doc.rulerUnits = RulerUnits.Millimeters;
    log("Document created");
    
    // Check for file
    var imgPath = new File(scriptFolder + '/PatBlk.eps');
    log("Looking for: " + imgPath.fsName);
    
    if (!imgPath.exists) {
        logAlert("PatBlk.eps not found in " + scriptFolder.fsName);
    } else {
        log("File found, placing images...");
        
        // Place first image
        var placed1 = doc.placedItems.add();
        placed1.file = imgPath;
        placed1.embed();
        log("Image 1 placed, size: " + placed1.width + " x " + placed1.height);
        
        // Scale to target
        var targetW = mmToPt(TARGET_WIDTH_MM);
        var targetH = mmToPt(TARGET_HEIGHT_MM);
        var scale = Math.min(targetW/placed1.width, targetH/placed1.height) * 100;
        placed1.resize(scale, scale);
        log("Image 1 scaled to: " + placed1.width + " x " + placed1.height);
        
        // Position first image
        placed1.position = [mmToPt(10), -mmToPt(10)];
        
        // Place second image
        var placed2 = doc.placedItems.add();
        placed2.file = imgPath;
        placed2.embed();
        placed2.resize(scale, scale);
        
        // Position second image
        placed2.position = [
            placed1.left + placed1.width + mmToPt(10),
            placed1.top
        ];
        log("Image 2 positioned at: " + placed2.position);
        
        logAlert("Successfully placed 2 images side by side");
    }
    
} catch (e) {
    log("ERROR: " + e);
    logAlert("Error: " + e);
} finally {
    if (logFile) {
        log("Script completed");
        logFile.writeln("Ended: " + new Date());
        logFile.close();
    }
}