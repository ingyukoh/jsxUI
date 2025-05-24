#target illustrator

// Create dialog window
var dialog = new Window("dialog", "Simple Button Dialog");

// Add button to dialog
var myButton = dialog.add("button", undefined, "Click Me!");

// Add button click event handler
myButton.onClick = function() {
    alert("Hello World");
};

// Add close button
var closeButton = dialog.add("button", undefined, "Close");
closeButton.onClick = function() {
    dialog.close();
};

// Show the dialog
dialog.show();