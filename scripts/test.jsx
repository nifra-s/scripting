var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var buttonOne = window.add("button", undefined, "Button 1");

buttonOne.onClick = function() {
    addMyText();
}

window.center();
window.show();

// Create New Text Layer
function addMyText() {
    var mainComp = app.project.activeItem;
   
    
}