#target illustrator

// Simplified version that FORCES side-by-side placement
(function() {
    try {
        // Convert mm to points
        function mmToPt(mm) { return mm * 2.834645669; }
        function ptToMm(pt) { return pt / 2.834645669; }
        
        // Settings
        var targetWidthMm = 40;
        var separationMm = 10;
        var marginMm = 10;
        
        var targetWidth = mmToPt(targetWidthMm);
        var separation = mmToPt(separationMm);
        var margin = mmToPt(marginMm);
        
        // Create document
        var doc = app.documents.add(DocumentColorSpace.RGB);
        var artboard = doc.artboards[0];
        artboard.artboardRect = [0, mmToPt(300), mmToPt(150), 0];
        
        // Get file
        var scriptFile = new File($.fileName);
        var imgPath = new File(scriptFile.parent + '/PatBlk.eps');
        
        if (!imgPath.exists) {
            alert('PatBlk.eps not found!');
            return;
        }
        
        // STEP 1: Place and scale FIRST image
        alert("Step 1: Placing first image...");
        
        var img1 = doc.placedItems.add();
        img1.file = imgPath;
        img1.embed();
        
        // Scale first image to target width
        var scale1 = (targetWidth / img1.width) * 100;
        img1.resize(scale1, scale1);
        
        // Position first image at fixed location
        var img1Left = margin;
        var img1Top = mmToPt(250); // Fixed top position
        
        img1.left = img1Left;
        img1.top = img1Top;
        
        // Force redraw and get actual width
        app.redraw();
        var img1ActualWidth = img1.width;
        
        alert("Image 1 placed:\n" +
              "Position: " + ptToMm(img1.left).toFixed(1) + "mm from left\n" +
              "Width: " + ptToMm(img1ActualWidth).toFixed(1) + "mm\n" +
              "Scale: " + scale1.toFixed(1) + "%");
        
        // STEP 2: Place SECOND image with FORCED positioning
        alert("Step 2: Placing second image...");
        
        var img2 = doc.placedItems.add();
        img2.file = imgPath;
        img2.embed();
        
        // Use SAME scale as first image
        img2.resize(scale1, scale1);
        
        // CRITICAL: Calculate second image position using FIXED math
        var img2Left = img1Left + img1ActualWidth + separation;
        var img2Top = img1Top; // Same top as first image
        
        img2.left = img2Left;
        img2.top = img2Top;
        
        // Verify positioning
        app.redraw();
        
        var actualGap = img2.left - (img1.left + img1.width);
        
        alert("Image 2 placed:\n" +
              "Position: " + ptToMm(img2.left).toFixed(1) + "mm from left\n" +
              "Calculated position: " + ptToMm(img2Left).toFixed(1) + "mm\n" +
              "Gap from Image 1: " + ptToMm(actualGap).toFixed(1) + "mm");
        
        // STEP 3: Add labels
        var label1 = doc.textFrames.add();
        label1.contents = "Image 1";
        label1.left = img1.left;
        label1.top = img1.top - img1.height - mmToPt(2);
        
        var label2 = doc.textFrames.add();
        label2.contents = "Image 2";
        label2.left = img2.left;
        label2.top = img2.top - img2.height - mmToPt(2);
        
        // STEP 4: Verification
        var totalWidth = (img2.left + img2.width) - img1.left;
        
        // Select both images to highlight them
        doc.selection = [img1, img2];
        
        alert("✅ FINAL RESULT:\n\n" +
              "Image 1: " + ptToMm(img1.left).toFixed(1) + "mm from left\n" +
              "Image 2: " + ptToMm(img2.left).toFixed(1) + "mm from left\n" +
              "Gap: " + ptToMm(actualGap).toFixed(1) + "mm\n" +
              "Total width: " + ptToMm(totalWidth).toFixed(1) + "mm\n\n" +
              "Both images should now be selected and visible side-by-side!");
              
    } catch (error) {
        alert("ERROR: " + error.toString());
    }
})();