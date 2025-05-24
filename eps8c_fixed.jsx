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

// Function to add text below an image
function addTextBelow(doc, img, text) {
    try {
        // Create text frame
        var textFrame = doc.textFrames.add();
        textFrame.contents = text;
        
        // Style the text first
        textFrame.textRange.characterAttributes.size = 12;
        textFrame.textRange.justification = Justification.CENTER;
        
        // Force redraw to calculate dimensions
        app.redraw();
        
        // Position text centered below the image
        // Calculate bottom of image (remember: top is positive, bottom is negative in Illustrator)
        var imgBottom = img.top - img.height;
        
        // Position text 10 points below the image
        textFrame.top = imgBottom - 10;
        
        // Center the text horizontally
        // Use a try-catch in case width is still not available
        try {
            var textWidth = textFrame.width;
            textFrame.left = img.left + (img.width / 2) - (textWidth / 2);
        } catch (e) {
            // Fallback: just align to image left
            textFrame.left = img.left;
            logToFile("Warning: Could not center text, using left alignment");
        }
        
        return textFrame;
    } catch (e) {
        logToFile("Error in addTextBelow: " + e.toString());
        alert("Error adding text: " + e.toString());
        return null;
    }
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
    var fileName = imgFile.name; // Get just the filename
    
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
        
        // Add text below first image
        var text1 = addTextBelow(doc, img1, fileName);
        if (text1) {
            alert("✅ Text added below first image");
            logToFile("Text '" + fileName + "' added below first image");
        }
        
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
        
        // Add text below second image
        var text2 = addTextBelow(doc, img2, fileName);
        if (text2) {
            alert("✅ Text added below second image");
            logToFile("Text '" + fileName + "' added below second image");
        }
        
        // Select items that were successfully created
        var itemsToSelect = [img1, img2];
        if (text1) itemsToSelect.push(text1);
        if (text2) itemsToSelect.push(text2);
        doc.selection = itemsToSelect;
        
        alert("🎉 SUCCESS!\nBoth images resized with aspect ratio preserved.\nFilename labels added below each image.\nFirst image at 100, Second image at 300");
        logToFile("SUCCESS! Both images resized with aspect ratio preserved. Filename labels added below each image. First image at 100, Second image at 300");
    }
    
} catch (error) {
    alert("💥 ERROR at line " + error.line + ":\n" + error.toString());
    logToFile("ERROR at line " + error.line + ": " + error.toString());
}