#target illustrator

// Create dialog window
var dialog = new Window("dialog", "Pattern File Selection");

// Variables to store selected files
var selectedPatCol = null;
var selectedPatBlk = null;
var selectedBlueprint = null;

// Create main container with horizontal layout for columns
var mainContainer = dialog.add("group");
mainContainer.orientation = "row";
mainContainer.alignChildren = "top";

// === LEFT COLUMN ===
var leftColumn = mainContainer.add("group");
leftColumn.orientation = "column";
leftColumn.alignChildren = "left";

// Create a group for PatCol section
var patColGroup = leftColumn.add("group");
patColGroup.orientation = "column";
patColGroup.alignChildren = "left";

// Add PatCol button
var patColButton = patColGroup.add("button", undefined, "Pattern Col");
patColButton.preferredSize.width = 150;

// Add text field for PatCol filename
var patColText = patColGroup.add("statictext", undefined, "No file selected");
patColText.preferredSize.width = 150;

// Add spacing
leftColumn.add("panel", undefined, "").preferredSize.height = 10;

// Create a group for PatBlk section
var patBlkGroup = leftColumn.add("group");
patBlkGroup.orientation = "column";
patBlkGroup.alignChildren = "left";

// Add PatBlk button
var patBlkButton = patBlkGroup.add("button", undefined, "Pattern Blk");
patBlkButton.preferredSize.width = 150;

// Add text field for PatBlk filename
var patBlkText = patBlkGroup.add("statictext", undefined, "No file selected");
patBlkText.preferredSize.width = 150;

// Add vertical separator
mainContainer.add("panel", undefined, "").preferredSize.width = 20;

// === RIGHT COLUMN ===
var rightColumn = mainContainer.add("group");
rightColumn.orientation = "column";
rightColumn.alignChildren = "left";

// Create a group for 2d BluePrint section
var blueprintGroup = rightColumn.add("group");
blueprintGroup.orientation = "column";
blueprintGroup.alignChildren = "left";

// Add 2d BluePrint button
var blueprintButton = blueprintGroup.add("button", undefined, "2d BluePrint");
blueprintButton.preferredSize.width = 150;

// Add text field for 2d BluePrint filename
var blueprintText = blueprintGroup.add("statictext", undefined, "No file selected");
blueprintText.preferredSize.width = 150;

// Add spacing
rightColumn.add("panel", undefined, "").preferredSize.height = 20;

// Add label for synthesized filenames
var synthLabel = rightColumn.add("statictext", undefined, "Synthesized Names:");
synthLabel.graphics.font = ScriptUI.newFont("dialog", "BOLD", 12);

// Add spacing
rightColumn.add("panel", undefined, "").preferredSize.height = 5;

// Create group for Masked PatCol
var maskedColGroup = rightColumn.add("group");
maskedColGroup.orientation = "column";
maskedColGroup.alignChildren = "left";

var maskedColLabel = maskedColGroup.add("statictext", undefined, "Masked PatCol:");
var maskedColText = maskedColGroup.add("statictext", undefined, "-");
maskedColText.preferredSize.width = 200;

// Add spacing
rightColumn.add("panel", undefined, "").preferredSize.height = 10;

// Create group for Masked PatBlk
var maskedBlkGroup = rightColumn.add("group");
maskedBlkGroup.orientation = "column";
maskedBlkGroup.alignChildren = "left";

var maskedBlkLabel = maskedBlkGroup.add("statictext", undefined, "Masked PatBlk:");
var maskedBlkText = maskedBlkGroup.add("statictext", undefined, "-");
maskedBlkText.preferredSize.width = 200;

// Function to update synthesized names
function updateSynthesizedNames() {
    if (selectedBlueprint && selectedPatCol) {
        // Remove .eps extension if present
        var blueprintBase = selectedBlueprint.name.replace(/\.eps$/i, "");
        var patColBase = selectedPatCol.name.replace(/\.eps$/i, "");
        maskedColText.text = blueprintBase + "_" + patColBase + ".eps";
    } else {
        maskedColText.text = "-";
    }
    
    if (selectedBlueprint && selectedPatBlk) {
        // Remove .eps extension if present
        var blueprintBase = selectedBlueprint.name.replace(/\.eps$/i, "");
        var patBlkBase = selectedPatBlk.name.replace(/\.eps$/i, "");
        maskedBlkText.text = blueprintBase + "_" + patBlkBase + ".eps";
    } else {
        maskedBlkText.text = "-";
    }
}

// PatCol button click handler
patColButton.onClick = function() {
    // Open file selection dialog with filter for EPS files
    var selectedFile = File.openDialog("Select Pattern Col file", "*.eps");
    
    if (selectedFile != null) {
        selectedPatCol = selectedFile;
        patColText.text = selectedFile.name;
        updateSynthesizedNames();
    }
};

// PatBlk button click handler
patBlkButton.onClick = function() {
    // Open file selection dialog with filter for EPS files
    var selectedFile = File.openDialog("Select Pattern Blk file", "*.eps");
    
    if (selectedFile != null) {
        selectedPatBlk = selectedFile;
        patBlkText.text = selectedFile.name;
        updateSynthesizedNames();
    }
};

// 2d BluePrint button click handler
blueprintButton.onClick = function() {
    // Open file selection dialog with filter for EPS files
    var selectedFile = File.openDialog("Select 2d BluePrint file", "*.eps");
    
    if (selectedFile != null) {
        selectedBlueprint = selectedFile;
        blueprintText.text = selectedFile.name;
        updateSynthesizedNames();
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