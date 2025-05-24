// eps7b_test.jsx - Simple test version to diagnose issues

#target illustrator

// Test 1: Basic alert
alert("Test 1: Basic alert works");

// Test 2: Try to create log file
try {
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var logFile = new File(scriptFolder + "/log_test.txt");
    logFile.open("w");
    logFile.writeln("Test log file created at: " + new Date());
    logFile.writeln("Script file: " + scriptFile.fsName);
    logFile.writeln("Script folder: " + scriptFolder.fsName);
    logFile.close();
    alert("Test 2: Log file created successfully");
} catch (e) {
    alert("Test 2 Error: " + e);
}

// Test 3: Basic function
try {
    function testFunction() {
        return "Function works";
    }
    alert("Test 3: " + testFunction());
} catch (e) {
    alert("Test 3 Error: " + e);
}

alert("All tests completed");