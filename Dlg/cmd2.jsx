#target illustrator

// Create dialog window
var dialog = new Window("dialog", "File Selection Dialog");

// Add button to dialog
var myButton = dialog.add("button", undefined, "Select File");

// Add static text to display filename (initially empty)
var fileNameText = dialog.add("statictext", undefined, "No file selected");
fileNameText.preferredSize.width = 300; // Make text field wider

// Add button click event handler
myButton.onClick = function() {
    // Open file selection dialog
    var selectedFile = File.openDialog("Select a file");
    
    if (selectedFile != null) {
        // Update the text with the selected filename
        fileNameText.text = "Selected: " + selectedFile.name;
    } else {
        fileNameText.text = "No file selected";
    }
};

// Add close button
var closeButton = dialog.add("button", undefined, "Close");
closeButton.onClick = function() {
    dialog.close();
};

// Show the dialog
dialog.show();