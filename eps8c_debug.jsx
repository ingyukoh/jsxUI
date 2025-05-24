#target illustrator

// Logging function
function logToFile(message) {
    try {
        var scriptFile = new File($.fileName);
        var logFile = new File(scriptFile.parent + "/log.txt");
        
        // Create timestamp
        var now = new Date();
        var timestamp = now.getFullYear() + "-" + 
                       ("0" + (now.getMonth() + 1)).slice(-2) + "-" + 
                       ("0" + now.getDate()).slice(-2) + " " + 
                       ("0" + now.getHours()).slice(-2) + ":" + 
                       ("0" + now.getMinutes()).slice(-2) + ":" + 
                       ("0" + now.getSeconds()).slice(-2) + "." + 
                       ("00" + now.getMilliseconds()).slice(-3);
        
        logFile.open("a"); // append mode
        logFile.writeln("[" + timestamp + "] " + message);
        logFile.close();
    } catch (e) {
        // Silent fail - don't interrupt script
    }
}

// Test if script even starts
logToFile("=== eps8c_debug.jsx starting ===");
alert("Debug: Script file loaded");

try {
    alert("Debug: About to check Illustrator");
    if (app) {
        alert("Debug: Illustrator app object exists");
        logToFile("Illustrator app object confirmed");
    }
    
    // Test basic functionality
    alert("Debug: Testing basic operations");
    var testDoc = app.documents.add();
    alert("Debug: Document created successfully");
    logToFile("Test document created");
    
    // Close test doc
    testDoc.close(SaveOptions.DONOTSAVECHANGES);
    alert("Debug: Test complete - script is working");
    logToFile("Basic test completed successfully");
    
} catch (error) {
    alert("Debug ERROR: " + error.toString());
    logToFile("Debug ERROR: " + error.toString());
}