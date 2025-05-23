#target illustrator

(function () {
    try {
        // Show startup message
        alert("🚀 Starting dial6.jsx script...");
        
        var TARGET_HEIGHT = 400;           // Target height in points
        var GAP = 20;                     // Gap between items
        var MARGIN_TOP = 50;              // Margin from top
        var MARGIN_LEFT = 50;             // Margin from left

        var scriptFile = new File($.fileName);
        var folder = scriptFile.parent;
        
        alert("📂 Looking for files in: " + folder.fsName);
        
        var pngFile = new File(folder + "/PatCol.png");
        var epsFile = new File(folder + "/PatBlk.eps");

        // Check files with detailed feedback
        if (!pngFile.exists) {
            alert("❌ PatCol.png not found in:\n" + folder.fsName + "\n\nPlease ensure the file exists in the same folder as this script.");
            return;
        }
        
        if (!epsFile.exists) {
            alert("❌ PatBlk.eps not found in:\n" + folder.fsName + "\n\nPlease ensure the file exists in the same folder as this script.");
            return;
        }
        
        alert("✅ Both files found!\nPNG: " + pngFile.name + "\nEPS: " + epsFile.name);

        // Create new RGB document
        alert("📄 Creating new document...");
        var doc = app.documents.add(DocumentColorSpace.RGB);
        var artboard = doc.artboards[0];
        var artboardRect = artboard.artboardRect;
        var startLeft = artboardRect[0] + MARGIN_LEFT;
        var startTop = artboardRect[1] - MARGIN_TOP;
        
        alert("📐 Document created. Artboard size: " + (artboardRect[2] - artboardRect[0]) + " x " + (artboardRect[1] - artboardRect[3]) + " points");

        // === PLACE PNG ===
        alert("🖼️ Placing PNG file...");
        var pngItem = doc.placedItems.add();
        pngItem.file = pngFile;
        
        alert("📎 PNG placed. Original size: " + pngItem.width.toFixed(1) + " x " + pngItem.height.toFixed(1) + " points");
        
        pngItem.embed();
        
        // Scale PNG to target height
        if (pngItem.height !== 0) {
            var scale = (TARGET_HEIGHT / pngItem.height) * 100;
            alert("🔄 Scaling PNG by " + scale.toFixed(1) + "%");
            pngItem.resize(scale, scale);
        }
        
        // Position PNG
        pngItem.left = startLeft;
        pngItem.top = startTop;
        
        alert("📍 PNG positioned at: left=" + pngItem.left.toFixed(1) + ", top=" + pngItem.top.toFixed(1));
        
        // CRITICAL: Force Illustrator to recalculate bounds after positioning
        app.redraw();
        var pngBounds = pngItem.geometricBounds;
        var pngActualWidth = pngBounds[2] - pngBounds[0]; // right - left
        
        alert("📏 PNG actual width after scaling: " + pngActualWidth.toFixed(1) + " points");

        // === PLACE EPS ===
        alert("🎨 Placing EPS file...");
        var epsItem = doc.placedItems.add();
        epsItem.file = epsFile;
        
        alert("📎 EPS placed. Original size: " + epsItem.width.toFixed(1) + " x " + epsItem.height.toFixed(1) + " points");
        
        epsItem.embed();
        
        // Scale EPS to target height
        if (epsItem.height !== 0) {
            var scale2 = (TARGET_HEIGHT / epsItem.height) * 100;
            alert("🔄 Scaling EPS by " + scale2.toFixed(1) + "%");
            epsItem.resize(scale2, scale2);
        }
        
        // Position EPS to the RIGHT of PNG using actual calculated width
        var epsLeft = startLeft + pngActualWidth + GAP;
        epsItem.left = epsLeft;
        epsItem.top = startTop;
        
        alert("📍 EPS positioned at: left=" + epsItem.left.toFixed(1) + ", top=" + epsItem.top.toFixed(1) + "\nGap from PNG: " + GAP + " points");
        
        // Force final redraw
        app.redraw();
        
        // Select both items for visual confirmation
        doc.selection = [pngItem, epsItem];
        
        // Final success message
        alert("🎉 SUCCESS!\n\nPNG and EPS placed side by side:\n• PNG: " + pngItem.width.toFixed(1) + " x " + pngItem.height.toFixed(1) + " points\n• EPS: " + epsItem.width.toFixed(1) + " x " + epsItem.height.toFixed(1) + " points\n• Gap: " + GAP + " points");

    } catch (error) {
        alert("💥 ERROR occurred:\n\n" + error.toString() + "\n\nScript: " + $.fileName + "\nLine: " + error.line);
    }
})();
