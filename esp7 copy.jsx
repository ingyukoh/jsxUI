#target illustrator

// Ultra-simple version with maximum error checking
alert("🚀 Script starting...");

try {
    alert("Step 1: Getting file path...");
    
    // Get script file and folder
    var scriptFile = new File($.fileName);
    var folder = scriptFile.parent;
    
    alert("Script folder: " + folder.fsName);
    
    // Look for PatBlk.eps
    var imgFile = new File(folder + "/PatBlk.eps");
    
    alert("Looking for: " + imgFile.fsName);
    alert("File exists: " + imgFile.exists);
    
    if (!imgFile.exists) {
        alert("❌ STOP: PatBlk.eps not found!\nPlace PatBlk.eps in the same folder as this script.");
        // Exit gracefully
    } else {
        alert("✅ File found! Continuing...");
        
        alert("Step 2: Creating document...");
        
        // Create simple document
        var doc = app.documents.add();
        
        alert("✅ Document created");
        
        alert("Step 3: Placing first image...");
        
        // Place first image
        var img1 = doc.placedItems.add();
        img1.file = imgFile;
        
        alert("✅ First image placed");
        
        // Simple positioning - no scaling yet
        img1.left = 100;
        img1.top = 400;
        
        alert("✅ First image positioned at 100, 400");
        
        alert("Step 4: Placing second image...");
        
        // Place second image  
        var img2 = doc.placedItems.add();
        img2.file = imgFile;
        
        alert("✅ Second image placed");
        
        // Position second image to the right - simple math
        img2.left = 300; // Fixed position far to the right
        img2.top = 400;  // Same top as first
        
        alert("✅ Second image positioned at 300, 400");
        
        // Select both to make them visible
        doc.selection = [img1, img2];
        
        alert("🎉 SUCCESS!\nBoth images should now be visible side by side.\nFirst image at 100, Second image at 300");
    }
    
} catch (error) {
    alert("💥 ERROR at line " + error.line + ":\n" + error.toString());
}