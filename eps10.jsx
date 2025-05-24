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
        
        // Check for PatCol.eps
        var imgFileCol = new File(folder + "/PatCol.eps");
        alert("Looking for: " + imgFileCol.fsName);
        logToFile("Looking for: " + imgFileCol.fsName);
        alert("PatCol.eps exists: " + imgFileCol.exists);
        logToFile("PatCol.eps exists: " + imgFileCol.exists);
        
        if (!imgFileCol.exists) {
            alert("❌ STOP: PatCol.eps not found!\nPlace PatCol.eps in the same folder as this script.");
            logToFile("ERROR: PatCol.eps not found! Place PatCol.eps in the same folder as this script.");
        } else {
            alert("✅ Both files found! Continuing...");
            logToFile("Both files found! Continuing...");
            
            alert("Step 2: Creating document...");
            logToFile("Step 2: Creating document...");
            
            // Create simple document
            var doc = app.documents.add();
            
            alert("✅ Document created");
            logToFile("Document created");
            
            // In Illustrator, Y coordinates increase upward
            // Default artboard is typically around 792 points tall (US Letter)
            // So upper area would have high Y values (e.g., 700+)
            
            alert("Step 3: Placing first PatBlk image...");
            logToFile("Step 3: Placing first PatBlk image...");
            
            // Place first image
            var img1 = doc.placedItems.add();
            img1.file = imgFile;
            
            alert("✅ First PatBlk image placed");
            logToFile("First PatBlk image placed");
            
            // Get original dimensions
            var originalWidth1 = img1.width;
            var originalHeight1 = img1.height;
            logToFile("First image original size: " + originalWidth1.toFixed(2) + " x " + originalHeight1.toFixed(2));
            
            // Resize first image to approximately 150 x 300 keeping aspect ratio
            var result1 = resizeWithAspectRatio(img1, 150, 300);
            var savedScale = result1.scale; // Save scale for PatCol images
            
            alert("✅ First image resized to " + result1.newWidth.toFixed(2) + " x " + result1.newHeight.toFixed(2) + " (scale: " + result1.scale.toFixed(1) + "%)");
            logToFile("First image resized to " + result1.newWidth.toFixed(2) + " x " + result1.newHeight.toFixed(2) + " (scale: " + result1.scale.toFixed(1) + "%)");
            
            // Position in upper left corner with small margin
            // In Illustrator, top is positive Y, so we need a high Y value for upper position
            var margin = 20; // 20 points margin
            img1.left = margin;
            img1.top = 700; // High Y value for upper position
            
            alert("✅ First image positioned at upper left: " + img1.left + ", " + img1.top);
            logToFile("First image positioned at upper left: " + img1.left + ", " + img1.top);
            
            // Add text below first image - simplified version
            var text1;
            try {
                alert("Adding text below first PatBlk image...");
                logToFile("Attempting to add text below first PatBlk image...");
                
                text1 = doc.textFrames.add();
                text1.contents = fileName;
                
                // Simple positioning
                var imgBottom = img1.top - img1.height;
                text1.top = imgBottom - 10;
                text1.left = img1.left;
                
                // Basic text properties
                text1.textRange.characterAttributes.size = 12;
                
                alert("✅ Text added below first image");
                logToFile("Text '" + fileName + "' added below first image at position: " + text1.left + ", " + text1.top);
            } catch (textError) {
                alert("⚠️ Could not add text: " + textError.toString());
                logToFile("Text error: " + textError.toString());
            }
            
            alert("Step 4: Placing second PatBlk image...");
            logToFile("Step 4: Placing second PatBlk image...");
            
            // Place second image  
            var img2 = doc.placedItems.add();
            img2.file = imgFile;
            
            alert("✅ Second PatBlk image placed");
            logToFile("Second PatBlk image placed");
            
            // Get original dimensions
            var originalWidth2 = img2.width;
            var originalHeight2 = img2.height;
            logToFile("Second image original size: " + originalWidth2.toFixed(2) + " x " + originalHeight2.toFixed(2));
            
            // Resize second image to approximately 150 x 300 keeping aspect ratio
            var result2 = resizeWithAspectRatio(img2, 150, 300);
            
            alert("✅ Second image resized to " + result2.newWidth.toFixed(2) + " x " + result2.newHeight.toFixed(2) + " (scale: " + result2.scale.toFixed(1) + "%)");
            logToFile("Second image resized to " + result2.newWidth.toFixed(2) + " x " + result2.newHeight.toFixed(2) + " (scale: " + result2.scale.toFixed(1) + "%)");
            
            // Position second image to the right of first image in upper area
            img2.left = margin + img1.width + 20; // First image position + width + gap
            img2.top = 700;  // Same top as first image
            
            alert("✅ Second image positioned at upper area: " + img2.left + ", " + img2.top);
            logToFile("Second image positioned at upper area: " + img2.left + ", " + img2.top);
            
            // Add text below second image - simplified version
            var text2;
            try {
                alert("Adding text below second PatBlk image...");
                logToFile("Attempting to add text below second PatBlk image...");
                
                text2 = doc.textFrames.add();
                text2.contents = fileName;
                
                // Simple positioning
                var imgBottom2 = img2.top - img2.height;
                text2.top = imgBottom2 - 10;
                text2.left = img2.left;
                
                // Basic text properties
                text2.textRange.characterAttributes.size = 12;
                
                alert("✅ Text added below second image");
                logToFile("Text '" + fileName + "' added below second image at position: " + text2.left + ", " + text2.top);
            } catch (textError2) {
                alert("⚠️ Could not add text: " + textError2.toString());
                logToFile("Text error: " + textError2.toString());
            }
            
            // Calculate position for PatCol images below
            var lowestPoint = img1.top - img1.height - 40; // 40 points below text
            if (text1) {
                lowestPoint = text1.top - 40; // Below text if it exists
            }
            
            alert("Step 5: Placing first PatCol image...");
            logToFile("Step 5: Placing first PatCol image...");
            
            // Place first PatCol image
            var img3 = doc.placedItems.add();
            img3.file = imgFileCol;
            
            alert("✅ First PatCol image placed");
            logToFile("First PatCol image placed");
            
            // Get original dimensions and apply same scale
            var originalWidth3 = img3.width;
            var originalHeight3 = img3.height;
            logToFile("First PatCol original size: " + originalWidth3.toFixed(2) + " x " + originalHeight3.toFixed(2));
            
            // Apply the same scale as PatBlk images
            img3.width = originalWidth3 * (savedScale / 100);
            img3.height = originalHeight3 * (savedScale / 100);
            
            alert("✅ First PatCol resized to " + img3.width.toFixed(2) + " x " + img3.height.toFixed(2) + " (scale: " + savedScale.toFixed(1) + "%)");
            logToFile("First PatCol resized to " + img3.width.toFixed(2) + " x " + img3.height.toFixed(2) + " (scale: " + savedScale.toFixed(1) + "%)");
            
            // Position below first PatBlk image
            img3.left = margin;
            img3.top = lowestPoint;
            
            alert("✅ First PatCol positioned below PatBlk: " + img3.left + ", " + img3.top);
            logToFile("First PatCol positioned below PatBlk: " + img3.left + ", " + img3.top);
            
            // Add text below first PatCol image
            try {
                alert("Adding text below first PatCol image...");
                logToFile("Attempting to add text below first PatCol image...");
                
                var text3 = doc.textFrames.add();
                text3.contents = imgFileCol.name;
                
                // Simple positioning
                var imgBottom3 = img3.top - img3.height;
                text3.top = imgBottom3 - 10;
                text3.left = img3.left;
                
                // Basic text properties
                text3.textRange.characterAttributes.size = 12;
                
                alert("✅ Text added below first PatCol image");
                logToFile("Text '" + imgFileCol.name + "' added below first PatCol image at position: " + text3.left + ", " + text3.top);
            } catch (textError3) {
                alert("⚠️ Could not add text: " + textError3.toString());
                logToFile("Text error: " + textError3.toString());
            }
            
            alert("Step 6: Placing second PatCol image...");
            logToFile("Step 6: Placing second PatCol image...");
            
            // Place second PatCol image
            var img4 = doc.placedItems.add();
            img4.file = imgFileCol;
            
            alert("✅ Second PatCol image placed");
            logToFile("Second PatCol image placed");
            
            // Get original dimensions and apply same scale
            var originalWidth4 = img4.width;
            var originalHeight4 = img4.height;
            logToFile("Second PatCol original size: " + originalWidth4.toFixed(2) + " x " + originalHeight4.toFixed(2));
            
            // Apply the same scale as PatBlk images
            img4.width = originalWidth4 * (savedScale / 100);
            img4.height = originalHeight4 * (savedScale / 100);
            
            alert("✅ Second PatCol resized to " + img4.width.toFixed(2) + " x " + img4.height.toFixed(2) + " (scale: " + savedScale.toFixed(1) + "%)");
            logToFile("Second PatCol resized to " + img4.width.toFixed(2) + " x " + img4.height.toFixed(2) + " (scale: " + savedScale.toFixed(1) + "%)");
            
            // Position below second PatBlk image
            img4.left = margin + img3.width + 20;
            img4.top = lowestPoint;
            
            alert("✅ Second PatCol positioned below PatBlk: " + img4.left + ", " + img4.top);
            logToFile("Second PatCol positioned below PatBlk: " + img4.left + ", " + img4.top);
            
            // Add text below second PatCol image
            try {
                alert("Adding text below second PatCol image...");
                logToFile("Attempting to add text below second PatCol image...");
                
                var text4 = doc.textFrames.add();
                text4.contents = imgFileCol.name;
                
                // Simple positioning
                var imgBottom4 = img4.top - img4.height;
                text4.top = imgBottom4 - 10;
                text4.left = img4.left;
                
                // Basic text properties
                text4.textRange.characterAttributes.size = 12;
                
                alert("✅ Text added below second PatCol image");
                logToFile("Text '" + imgFileCol.name + "' added below second PatCol image at position: " + text4.left + ", " + text4.top);
            } catch (textError4) {
                alert("⚠️ Could not add text: " + textError4.toString());
                logToFile("Text error: " + textError4.toString());
            }
            
            // Select all images
            doc.selection = [img1, img2, img3, img4];
            
            alert("🎉 SUCCESS!\nPatBlk images in upper row.\nPatCol images below with same scale.\nAll filename labels added.");
            logToFile("SUCCESS! PatBlk images in upper row. PatCol images below with same scale. All filename labels added.");
        }
    }
    
} catch (error) {
    alert("💥 ERROR at line " + error.line + ":\n" + error.toString());
    logToFile("ERROR at line " + error.line + ": " + error.toString());
}