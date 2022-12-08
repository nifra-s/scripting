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
    var comp = app.project.activeItem; // get the active composition

// create a new composition and set its properties
var nestedComp = app.project.items.addComp("Nested Composition", 1920, 1080, 1, 10, 25);

// add a new layer to the nested composition
var layer = nestedComp.layers.addSolid([1, 0, 0], "Red Layer", 1920, 1080, 1, 10);

// add the nested composition to the active composition as a new layer
var nestedCompLayer = comp.layers.add(nestedComp);
   
    
}