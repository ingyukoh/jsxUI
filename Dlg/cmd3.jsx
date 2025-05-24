#target illustrator

// Create dialog window
var dialog = new Window("dialog", "Pattern File Selection");

// Create a group for PatCol section
var patColGroup = dialog.add("group");
patColGroup.orientation = "column";
patColGroup.alignChildren = "left";

// Add PatCol button
var patColButton = patColGroup.add("button", undefined, "Pattern Col");
patColButton.preferredSize.width = 150;

// Add text field for PatCol filename
var patColText = patColGroup.add("statictext", undefined, "No file selected");
patColText.preferredSize.width = 150;

// Add spacing
dialog.add("panel", undefined, "").preferredSize.height = 10;

// Create a group for PatBlk section
var patBlkGroup = dialog.add("group");
patBlkGroup.orientation = "column";
patBlkGroup.alignChildren = "left";

// Add PatBlk button
var patBlkButton = patBlkGroup.add("button", undefined, "Pattern Blk");
patBlkButton.preferredSize.width = 150;

// Add text field for PatBlk filename
var patBlkText = patBlkGroup.add("statictext", undefined, "No file selected");
patBlkText.preferredSize.width = 150;

// PatCol button click handler
patColButton.onClick = function() {
    // Open file selection dialog with filter for EPS files
    var selectedFile = File.openDialog("Select Pattern Col file", "*.eps");
    
    if (selectedFile != null) {
        patColText.text = selectedFile.name;
    }
};

// PatBlk button click handler
patBlkButton.onClick = function() {
    // Open file selection dialog with filter for EPS files
    var selectedFile = File.openDialog("Select Pattern Blk file", "*.eps");
    
    if (selectedFile != null) {
        patBlkText.text = selectedFile.name;
    }
};

// Add spacing before close button
dialog.add("panel", undefined, "").preferredSize.height = 20;

// Add close button
var closeButton = dialog.add("button", undefined, "Close");
closeButton.onClick = function() {
    dialog.close();
};

// Show the dialog
dialog.show();