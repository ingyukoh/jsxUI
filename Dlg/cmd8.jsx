#target illustrator

// Logging function
function logToFile(action, details) {
    try {
        var scriptFile = new File($.fileName);
        var logFile = new File(scriptFile.parent + "/logCmd.txt");
        
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
        logFile.writeln("[" + timestamp + "] " + action + " - " + details);
        logFile.close();
    } catch (e) {
        // Silent fail - don't interrupt script
    }
}

// Log script start
logToFile("SCRIPT_START", "cmd8.jsx started");

// Create dialog window
var dialog = new Window("dialog", "Pattern File Selection");
logToFile("DIALOG_CREATED", "Main dialog window created");

// Variables to store selected files
var selectedPatCol = null;
var selectedPatBlk = null;
var selectedBlueprint = null;
var selectedBlueprint2 = null;
var selectedBlueprint3 = null;

// Create main container with horizontal layout for columns
var mainContainer = dialog.add("group");
mainContainer.orientation = "row";
mainContainer.alignChildren = "top";

// === FIRST COLUMN (Pattern Col/Blk) ===
var column1 = mainContainer.add("group");
column1.orientation = "column";
column1.alignChildren = "left";

// Create a group for PatCol section
var patColGroup = column1.add("group");
patColGroup.orientation = "column";
patColGroup.alignChildren = "left";

// Add PatCol button
var patColButton = patColGroup.add("button", undefined, "Pattern Col");
patColButton.preferredSize.width = 150;

// Add text field for PatCol filename
var patColText = patColGroup.add("statictext", undefined, "No file selected");
patColText.preferredSize.width = 150;

// Add spacing
column1.add("panel", undefined, "").preferredSize.height = 10;

// Create a group for PatBlk section
var patBlkGroup = column1.add("group");
patBlkGroup.orientation = "column";
patBlkGroup.alignChildren = "left";

// Add PatBlk button
var patBlkButton = patBlkGroup.add("button", undefined, "Pattern Blk");
patBlkButton.preferredSize.width = 150;

// Add text field for PatBlk filename
var patBlkText = patBlkGroup.add("statictext", undefined, "No file selected");
patBlkText.preferredSize.width = 150;

logToFile("UI_CREATED", "Column 1 (Pattern Col/Blk) created");

// Add vertical separator
mainContainer.add("panel", undefined, "").preferredSize.width = 20;

// === SECOND COLUMN (2d BluePrint - first instance) ===
var column2 = mainContainer.add("group");
column2.orientation = "column";
column2.alignChildren = "left";

// Create a group for 2d BluePrint section
var blueprintGroup = column2.add("group");
blueprintGroup.orientation = "column";
blueprintGroup.alignChildren = "left";

// Add 2d BluePrint button
var blueprintButton = blueprintGroup.add("button", undefined, "2d BluePrint");
blueprintButton.preferredSize.width = 150;

// Add text field for 2d BluePrint filename
var blueprintText = blueprintGroup.add("statictext", undefined, "No file selected");
blueprintText.preferredSize.width = 150;

// Add spacing
column2.add("panel", undefined, "").preferredSize.height = 20;

// Add label for synthesized filenames
var synthLabel = column2.add("statictext", undefined, "Synthesized Names:");
synthLabel.graphics.font = ScriptUI.newFont("dialog", "BOLD", 12);

// Add spacing
column2.add("panel", undefined, "").preferredSize.height = 5;

// Create group for Masked PatCol
var maskedColGroup = column2.add("group");
maskedColGroup.orientation = "column";
maskedColGroup.alignChildren = "left";

var maskedColLabel = maskedColGroup.add("statictext", undefined, "Masked PatCol:");
var maskedColText = maskedColGroup.add("statictext", undefined, "-");
maskedColText.preferredSize.width = 200;

// Add spacing
column2.add("panel", undefined, "").preferredSize.height = 10;

// Create group for Masked PatBlk
var maskedBlkGroup = column2.add("group");
maskedBlkGroup.orientation = "column";
maskedBlkGroup.alignChildren = "left";

var maskedBlkLabel = maskedBlkGroup.add("statictext", undefined, "Masked PatBlk:");
var maskedBlkText = maskedBlkGroup.add("statictext", undefined, "-");
maskedBlkText.preferredSize.width = 200;

logToFile("UI_CREATED", "Column 2 (2d BluePrint #1) created");

// Add vertical separator
mainContainer.add("panel", undefined, "").preferredSize.width = 20;

// === THIRD COLUMN (2d BluePrint - second instance) ===
var column3 = mainContainer.add("group");
column3.orientation = "column";
column3.alignChildren = "left";

// Create a group for 2d BluePrint section (second instance)
var blueprintGroup2 = column3.add("group");
blueprintGroup2.orientation = "column";
blueprintGroup2.alignChildren = "left";

// Add 2d BluePrint button (second instance)
var blueprintButton2 = blueprintGroup2.add("button", undefined, "2d BluePrint");
blueprintButton2.preferredSize.width = 150;

// Add text field for 2d BluePrint filename (second instance)
var blueprintText2 = blueprintGroup2.add("statictext", undefined, "No file selected");
blueprintText2.preferredSize.width = 150;

// Add spacing
column3.add("panel", undefined, "").preferredSize.height = 20;

// Add label for synthesized filenames (second instance)
var synthLabel2 = column3.add("statictext", undefined, "Synthesized Names:");
synthLabel2.graphics.font = ScriptUI.newFont("dialog", "BOLD", 12);

// Add spacing
column3.add("panel", undefined, "").preferredSize.height = 5;

// Create group for Masked PatCol (second instance)
var maskedColGroup2 = column3.add("group");
maskedColGroup2.orientation = "column";
maskedColGroup2.alignChildren = "left";

var maskedColLabel2 = maskedColGroup2.add("statictext", undefined, "Masked PatCol:");
var maskedColText2 = maskedColGroup2.add("statictext", undefined, "-");
maskedColText2.preferredSize.width = 200;

// Add spacing
column3.add("panel", undefined, "").preferredSize.height = 10;

// Create group for Masked PatBlk (second instance)
var maskedBlkGroup2 = column3.add("group");
maskedBlkGroup2.orientation = "column";
maskedBlkGroup2.alignChildren = "left";

var maskedBlkLabel2 = maskedBlkGroup2.add("statictext", undefined, "Masked PatBlk:");
var maskedBlkText2 = maskedBlkGroup2.add("statictext", undefined, "-");
maskedBlkText2.preferredSize.width = 200;

logToFile("UI_CREATED", "Column 3 (2d BluePrint #2) created");

// Add vertical separator
mainContainer.add("panel", undefined, "").preferredSize.width = 20;

// === FOURTH COLUMN (2d BluePrint - third instance) ===
var column4 = mainContainer.add("group");
column4.orientation = "column";
column4.alignChildren = "left";

// Create a group for 2d BluePrint section (third instance)
var blueprintGroup3 = column4.add("group");
blueprintGroup3.orientation = "column";
blueprintGroup3.alignChildren = "left";

// Add 2d BluePrint button (third instance)
var blueprintButton3 = blueprintGroup3.add("button", undefined, "2d BluePrint");
blueprintButton3.preferredSize.width = 150;

// Add text field for 2d BluePrint filename (third instance)
var blueprintText3 = blueprintGroup3.add("statictext", undefined, "No file selected");
blueprintText3.preferredSize.width = 150;

// Add spacing
column4.add("panel", undefined, "").preferredSize.height = 20;

// Add label for synthesized filenames (third instance)
var synthLabel3 = column4.add("statictext", undefined, "Synthesized Names:");
synthLabel3.graphics.font = ScriptUI.newFont("dialog", "BOLD", 12);

// Add spacing
column4.add("panel", undefined, "").preferredSize.height = 5;

// Create group for Masked PatCol (third instance)
var maskedColGroup3 = column4.add("group");
maskedColGroup3.orientation = "column";
maskedColGroup3.alignChildren = "left";

var maskedColLabel3 = maskedColGroup3.add("statictext", undefined, "Masked PatCol:");
var maskedColText3 = maskedColGroup3.add("statictext", undefined, "-");
maskedColText3.preferredSize.width = 200;

// Add spacing
column4.add("panel", undefined, "").preferredSize.height = 10;

// Create group for Masked PatBlk (third instance)
var maskedBlkGroup3 = column4.add("group");
maskedBlkGroup3.orientation = "column";
maskedBlkGroup3.alignChildren = "left";

var maskedBlkLabel3 = maskedBlkGroup3.add("statictext", undefined, "Masked PatBlk:");
var maskedBlkText3 = maskedBlkGroup3.add("statictext", undefined, "-");
maskedBlkText3.preferredSize.width = 200;

logToFile("UI_CREATED", "Column 4 (2d BluePrint #3) created");

// Function to update synthesized names for column 2
function updateSynthesizedNames() {
    logToFile("UPDATE_SYNTH", "Updating synthesized names for column 2");
    
    if (selectedBlueprint && selectedPatCol) {
        var blueprintBase = selectedBlueprint.name.replace(/\.eps$/i, "");
        var patColBase = selectedPatCol.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patColBase + ".eps";
        maskedColText.text = synthesized;
        logToFile("SYNTH_NAME", "Column 2 Masked PatCol: " + synthesized);
    } else {
        maskedColText.text = "-";
    }
    
    if (selectedBlueprint && selectedPatBlk) {
        var blueprintBase = selectedBlueprint.name.replace(/\.eps$/i, "");
        var patBlkBase = selectedPatBlk.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patBlkBase + ".eps";
        maskedBlkText.text = synthesized;
        logToFile("SYNTH_NAME", "Column 2 Masked PatBlk: " + synthesized);
    } else {
        maskedBlkText.text = "-";
    }
}

// Function to update synthesized names for column 3
function updateSynthesizedNames2() {
    logToFile("UPDATE_SYNTH", "Updating synthesized names for column 3");
    
    if (selectedBlueprint2 && selectedPatCol) {
        var blueprintBase = selectedBlueprint2.name.replace(/\.eps$/i, "");
        var patColBase = selectedPatCol.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patColBase + ".eps";
        maskedColText2.text = synthesized;
        logToFile("SYNTH_NAME", "Column 3 Masked PatCol: " + synthesized);
    } else {
        maskedColText2.text = "-";
    }
    
    if (selectedBlueprint2 && selectedPatBlk) {
        var blueprintBase = selectedBlueprint2.name.replace(/\.eps$/i, "");
        var patBlkBase = selectedPatBlk.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patBlkBase + ".eps";
        maskedBlkText2.text = synthesized;
        logToFile("SYNTH_NAME", "Column 3 Masked PatBlk: " + synthesized);
    } else {
        maskedBlkText2.text = "-";
    }
}

// Function to update synthesized names for column 4
function updateSynthesizedNames3() {
    logToFile("UPDATE_SYNTH", "Updating synthesized names for column 4");
    
    if (selectedBlueprint3 && selectedPatCol) {
        var blueprintBase = selectedBlueprint3.name.replace(/\.eps$/i, "");
        var patColBase = selectedPatCol.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patColBase + ".eps";
        maskedColText3.text = synthesized;
        logToFile("SYNTH_NAME", "Column 4 Masked PatCol: " + synthesized);
    } else {
        maskedColText3.text = "-";
    }
    
    if (selectedBlueprint3 && selectedPatBlk) {
        var blueprintBase = selectedBlueprint3.name.replace(/\.eps$/i, "");
        var patBlkBase = selectedPatBlk.name.replace(/\.eps$/i, "");
        var synthesized = blueprintBase + "_" + patBlkBase + ".eps";
        maskedBlkText3.text = synthesized;
        logToFile("SYNTH_NAME", "Column 4 Masked PatBlk: " + synthesized);
    } else {
        maskedBlkText3.text = "-";
    }
}

// PatCol button click handler
patColButton.onClick = function() {
    logToFile("BUTTON_CLICK", "Pattern Col button clicked");
    var selectedFile = File.openDialog("Select Pattern Col file", "*.eps");
    if (selectedFile != null) {
        selectedPatCol = selectedFile;
        patColText.text = selectedFile.name;
        logToFile("FILE_SELECTED", "Pattern Col: " + selectedFile.fsName);
        updateSynthesizedNames();
        updateSynthesizedNames2();
        updateSynthesizedNames3();
    } else {
        logToFile("FILE_SELECTION", "Pattern Col selection cancelled");
    }
};

// PatBlk button click handler
patBlkButton.onClick = function() {
    logToFile("BUTTON_CLICK", "Pattern Blk button clicked");
    var selectedFile = File.openDialog("Select Pattern Blk file", "*.eps");
    if (selectedFile != null) {
        selectedPatBlk = selectedFile;
        patBlkText.text = selectedFile.name;
        logToFile("FILE_SELECTED", "Pattern Blk: " + selectedFile.fsName);
        updateSynthesizedNames();
        updateSynthesizedNames2();
        updateSynthesizedNames3();
    } else {
        logToFile("FILE_SELECTION", "Pattern Blk selection cancelled");
    }
};

// 2d BluePrint button click handler (first instance)
blueprintButton.onClick = function() {
    logToFile("BUTTON_CLICK", "2d BluePrint button #1 clicked");
    var selectedFile = File.openDialog("Select 2d BluePrint file", "*.eps");
    if (selectedFile != null) {
        selectedBlueprint = selectedFile;
        blueprintText.text = selectedFile.name;
        logToFile("FILE_SELECTED", "2d BluePrint #1: " + selectedFile.fsName);
        updateSynthesizedNames();
    } else {
        logToFile("FILE_SELECTION", "2d BluePrint #1 selection cancelled");
    }
};

// 2d BluePrint button click handler (second instance)
blueprintButton2.onClick = function() {
    logToFile("BUTTON_CLICK", "2d BluePrint button #2 clicked");
    var selectedFile = File.openDialog("Select 2d BluePrint file", "*.eps");
    if (selectedFile != null) {
        selectedBlueprint2 = selectedFile;
        blueprintText2.text = selectedFile.name;
        logToFile("FILE_SELECTED", "2d BluePrint #2: " + selectedFile.fsName);
        updateSynthesizedNames2();
    } else {
        logToFile("FILE_SELECTION", "2d BluePrint #2 selection cancelled");
    }
};

// 2d BluePrint button click handler (third instance)
blueprintButton3.onClick = function() {
    logToFile("BUTTON_CLICK", "2d BluePrint button #3 clicked");
    var selectedFile = File.openDialog("Select 2d BluePrint file", "*.eps");
    if (selectedFile != null) {
        selectedBlueprint3 = selectedFile;
        blueprintText3.text = selectedFile.name;
        logToFile("FILE_SELECTED", "2d BluePrint #3: " + selectedFile.fsName);
        updateSynthesizedNames3();
    } else {
        logToFile("FILE_SELECTION", "2d BluePrint #3 selection cancelled");
    }
};

// Add spacing before close button
dialog.add("panel", undefined, "").preferredSize.height = 20;

// Add close button
var closeButton = dialog.add("button", undefined, "Close");
closeButton.onClick = function() {
    logToFile("BUTTON_CLICK", "Close button clicked");
    logToFile("SCRIPT_END", "cmd8.jsx ending");
    dialog.close();
};

logToFile("UI_CREATED", "All UI elements created, dialog ready to show");

// Show the dialog
dialog.show();

logToFile("DIALOG_SHOWN", "Dialog displayed to user");