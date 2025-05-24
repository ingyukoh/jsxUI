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

// Function to resize while maintaining aspect ratio
function resizeWithAspectRatio(img, targetWidth, targetHeight) {
    var originalWidth = img.width;
    var originalHeight = img.height;
    var aspectRatio = originalWidth / originalHeight;
    
    // Calculate scale factors
    var scaleX = targetWidth / originalWidth;
    var scaleY = targetHeight / originalHeight;
    
    // Use the smaller scale to maintain aspect ratio
    var scale = Math.min(scaleX, scaleY);
    
    // Apply the scale
    img.width = originalWidth * scale;
    img.height = originalHeight * scale;
    
    return {
        newWidth: img.width,
        newHeight: img.height,
        scale: scale * 100 // percentage
    };
}

// Ultra-simple version with maximum error checking
alert("🚀 Script starting...");
logToFile("Script starting...");

try {
    alert("Step 1: Getting file path...");
    logToFile("Step 1: Getting file path...");
    
    // Get script file and folder
    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    
    alert("Script folder: " + folder.fsName);
    logToFile("Script folder: " + folder.fsName);
    
    // Look for PatBlk.eps
    var imgFile = new File(folder + "/PatBlk.eps");
    
    alert("Looking for: " + imgFile.fsName);
    logToFile("Looking for: " + imgFile.fsName);
    alert("File exists: " + imgFile.exists);
    logToFile("File exists: " + imgFile.exists);
    
    if (!imgFile.exists) {
        alert("❌ STOP: PatBlk.eps not found!\nPlace PatBlk.eps in the same folder as this script.");
        logToFile("ERROR: PatBlk.eps not found! Place PatBlk.eps in the same folder as this script.");
        // Exit gracefully
    } else {
        alert("✅ File found! Continuing...");
        logToFile("File found! Continuing...");
        
        alert("Step 2: Creating document...");
        logToFile("Step 2: Creating document...");
        
        // Create simple document
        var doc = app.documents.add();
        
        alert("✅ Document created");
        logToFile("Document created");
        
        alert("Step 3: Placing first image...");
        logToFile("Step 3: Placing first image...");
        
        // Place first image
        var img1 = doc.placedItems.add();
        img1.file = imgFile;
        
        alert("✅ First image placed");
        logToFile("First image placed");
        
        // Get original dimensions
        var originalWidth1 = img1.width;
        var originalHeight1 = img1.height;
        logToFile("First image original size: " + originalWidth1.toFixed(2) + " x " + originalHeight1.toFixed(2));
        
        // Resize first image to approximately 150 x 300 keeping aspect ratio
        var result1 = resizeWithAspectRatio(img1, 150, 300);
        
        alert("✅ First image resized to " + result1.newWidth.toFixed(2) + " x " + result1.newHeight.toFixed(2) + " (scale: " + result1.scale.toFixed(1) + "%)");
        logToFile("First image resized to " + result1.newWidth.toFixed(2) + " x " + result1.newHeight.toFixed(2) + " (scale: " + result1.scale.toFixed(1) + "%)");
        
        // Simple positioning
        img1.left = 100;
        img1.top = 400;
        
        alert("✅ First image positioned at 100, 400");
        logToFile("First image positioned at 100, 400");
        
        alert("Step 4: Placing second image...");
        logToFile("Step 4: Placing second image...");
        
        // Place second image  
        var img2 = doc.placedItems.add();
        img2.file = imgFile;
        
        alert("✅ Second image placed");
        logToFile("Second image placed");
        
        // Get original dimensions
        var originalWidth2 = img2.width;
        var originalHeight2 = img2.height;
        logToFile("Second image original size: " + originalWidth2.toFixed(2) + " x " + originalHeight2.toFixed(2));
        
        // Resize second image to approximately 150 x 300 keeping aspect ratio
        var result2 = resizeWithAspectRatio(img2, 150, 300);
        
        alert("✅ Second image resized to " + result2.newWidth.toFixed(2) + " x " + result2.newHeight.toFixed(2) + " (scale: " + result2.scale.toFixed(1) + "%)");
        logToFile("Second image resized to " + result2.newWidth.toFixed(2) + " x " + result2.newHeight.toFixed(2) + " (scale: " + result2.scale.toFixed(1) + "%)");
        
        // Position second image to the right
        img2.left = 300; // Fixed position far to the right
        img2.top = 400;  // Same top as first
        
        alert("✅ Second image positioned at 300, 400");
        logToFile("Second image positioned at 300, 400");
        
        // Select both to make them visible
        doc.selection = [img1, img2];
        
        alert("🎉 SUCCESS!\nBoth images resized with aspect ratio preserved.\nFirst image at 100, Second image at 300");
        logToFile("SUCCESS! Both images resized with aspect ratio preserved. First image at 100, Second image at 300");
    }
    
} catch (error) {
    alert("💥 ERROR at line " + error.line + ":\n" + error.toString());
    logToFile("ERROR at line " + error.line + ": " + error.toString());
}