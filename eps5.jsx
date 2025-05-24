#target illustrator

// eps2_fixed.jsx - Display PatBlk.eps twice side by side with proper error handling
(function() {
    try {
        // Helper function
        function mmToPt(mm) {
            return mm * 2.834645669; // 1 mm = 2.834645669 points
        }
        
        function ptToMm(pt) {
            return pt / 2.834645669;
        }
        
        // Settings
        var targetWidth = mmToPt(40);   // 40mm target width
        var targetHeight = mmToPt(80);  // 80mm target height
        var margin = mmToPt(10);        // 10mm margin
        var separation = mmToPt(10);    // 10mm gap between images
        var labelGap = mmToPt(5);       // 5mm gap for labels
        
        alert("Starting eps2 script...\nTarget size: 40x80mm each\nSeparation: 10mm");
        
        // Create simple RGB document (more reliable than DocumentPreset)
        var doc = app.documents.add(DocumentColorSpace.RGB);
        
        // Set up artboard (200mm x 500mm converted to points)
        var artboard = doc.artboards[0];
        artboard.artboardRect = [0, mmToPt(500), mmToPt(200), 0];
        artboard.name = "Two Images Layout";
        
        alert("Document created. Artboard: " + ptToMm(artboard.artboardRect[2]).toFixed(1) + 
              "mm x " + ptToMm(artboard.artboardRect[1]).toFixed(1) + "mm");
        
        // Get image file
        var scriptFile = new File($.fileName);
        var imgPath = new File(scriptFile.parent + '/PatBlk.eps');
        
        if (!imgPath.exists) {
            alert('❌ PatBlk.eps not found in: ' + scriptFile.parent.fsName);
            return;
        }
        
        alert("✅ Found: " + imgPath.name);
        
        // Calculate positions
        var startLeft = margin;
        var startTop = mmToPt(500) - margin; // Top of artboard minus margin
        
        // ==== FIRST IMAGE (LEFT) ====================================
        alert("📍 Placing first image...");
        
        var placed1 = doc.placedItems.add();
        placed1.file = imgPath;
        placed1.embed();
        
        alert("Image 1 original size: " + ptToMm(placed1.width).toFixed(1) + 
              "mm x " + ptToMm(placed1.height).toFixed(1) + "mm");
        
        // Scale to fit within target dimensions
        var scaleW1 = (targetWidth / placed1.width) * 100;
        var scaleH1 = (targetHeight / placed1.height) * 100;
        var scale1 = Math.min(scaleW1, scaleH1);
        
        placed1.resize(scale1, scale1);
        
        // Position first image
        placed1.left = startLeft;
        placed1.top = startTop;
        
        // CRITICAL: Force Illustrator to recalculate bounds after scaling and positioning
        app.redraw();
        
        // Get actual bounds after positioning (more reliable than .width property)
        var placed1Bounds = placed1.geometricBounds;
        var placed1ActualLeft = placed1Bounds[0];
        var placed1ActualRight = placed1Bounds[2];
        var placed1ActualWidth = placed1ActualRight - placed1ActualLeft;
        
        alert("Image 1 actual bounds:\n" +
              "Left: " + ptToMm(placed1ActualLeft).toFixed(1) + "mm\n" +
              "Right: " + ptToMm(placed1ActualRight).toFixed(1) + "mm\n" +
              "Width: " + ptToMm(placed1ActualWidth).toFixed(1) + "mm\n" +
              "Scale factor: " + scale1.toFixed(1) + "%");
        
        // Force another redraw to ensure all bounds are committed
        app.redraw();
        
        // ==== SECOND IMAGE (RIGHT) ==================================
        alert("📍 Placing second image...");
        
        var placed2 = doc.placedItems.add();
        placed2.file = imgPath;
        placed2.embed();
        
        // Use SAME scale factor as first image to ensure identical size
        placed2.resize(scale1, scale1);
        
        // Position second image using actual calculated bounds from first image
        var image2Left = placed1ActualRight + separation;
        placed2.left = image2Left;
        placed2.top = placed1.top; // Same top position
        
        // Force redraw to commit second image position
        app.redraw();
        
        // Verify second image bounds
        var placed2Bounds = placed2.geometricBounds;
        var placed2ActualLeft = placed2Bounds[0];
        var actualGap = placed2ActualLeft - placed1ActualRight;
        
        alert("Image 2 positioned:\n" +
              "Calculated position: " + ptToMm(image2Left).toFixed(1) + "mm\n" +
              "Actual position: " + ptToMm(placed2ActualLeft).toFixed(1) + "mm\n" +
              "Actual gap: " + ptToMm(actualGap).toFixed(1) + "mm\n" +
              "Target gap: " + ptToMm(separation).toFixed(1) + "mm");
        
        // ==== ADD LABELS ============================================
        // Label for first image
        var txt1 = doc.textFrames.add();
        txt1.contents = "PatBlk.eps (1)";
        txt1.textRange.characterAttributes.size = 10;
        txt1.left = placed1.left;
        txt1.top = placed1.top - placed1.height - labelGap;
        
        // Label for second image  
        var txt2 = doc.textFrames.add();
        txt2.contents = "PatBlk.eps (2)";
        txt2.textRange.characterAttributes.size = 10;
        txt2.left = placed2.left;
        txt2.top = placed2.top - placed2.height - labelGap;
        
        // ==== INFO TEXT =============================================
        var totalWidth = placed2Bounds[2] - placed1Bounds[0]; // Use actual bounds
        var infoText = doc.textFrames.add();
        infoText.contents = "Total width: " + ptToMm(totalWidth).toFixed(1) + "mm | " +
                           "Each image: " + ptToMm(placed1ActualWidth).toFixed(1) + "x" + 
                           ptToMm(placed1Bounds[1] - placed1Bounds[3]).toFixed(1) + "mm | Gap: " +
                           ptToMm(actualGap).toFixed(1) + "mm";
        infoText.textRange.characterAttributes.size = 8;
        infoText.left = margin;
        infoText.top = Math.min(txt1.top, txt2.top) - labelGap * 2;
        
        // ==== FINAL VERIFICATION ====================================
        // Select both images for visual confirmation
        doc.selection = [placed1, placed2];
        
        alert("🎉 SUCCESS!\n\n" +
              "✅ Two images placed side by side\n" +
              "📏 Each: " + ptToMm(placed1ActualWidth).toFixed(1) + " x " + 
              ptToMm(placed1Bounds[1] - placed1Bounds[3]).toFixed(1) + "mm\n" +
              "📐 Total width: " + ptToMm(totalWidth).toFixed(1) + "mm\n" +
              "🔄 Actual gap: " + ptToMm(actualGap).toFixed(1) + "mm");
              
    } catch (error) {
        alert("💥 ERROR: " + error.toString() + "\nLine: " + error.line);
    }
})();