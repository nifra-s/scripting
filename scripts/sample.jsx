//UI
var window = new Window("palette", "My Script", undefined);
window.orientation = "column";
var buttonOne = window.add("button", undefined, "Add Text");



//UI functions
buttonOne.onClick = function() {
    createTextLayer("Happy\nholidays!\ntest",5,20);
}

window.center();
window.show();




// C75omp/Layer Stuff
function createTextLayer(myText,myInpoint,myOutPoint) {

    var comp = app.project.activeItem
    if(comp == null || !(comp instanceof CompItem) ) {
        alert("Please select a Composition");
        return false;
    }

    var textLayer = comp.layers.addText();
    textLayer.inPoint = myInpoint;
    textLayer.outPoint = myOutPoint;
    var textDocument = new TextDocument("");
    textDocument = textLayer.property("Source Text").value;
    textDocument.resetParagraphStyle();
    textDocument.text = myText;
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    textLayer.property("Source Text").setValue(textDocument);
    textLayer.position.setValue([comp.width*0.5 ,comp.height - textLayer.sourceRectAtTime(0,true).height])

    // var textDocument = new TextDocument("NEW TEXT");
    // textDocument = textLayer.property("Source Text").value;
    // textDocument.resetCharStyle();
    // textDocument.resetParagraphStyle();
    // textDocument.fontSize = 60;
    // textDocument.fillColor = [1, 0, 0];
    // textDocument.strokeColor = [0, 1, 0];
    // textDocument.strokeWidth = 2;
    // textDocument.font="Times New Roman PSMT";
    // textDocument.strokeOverFill = true; 
    // textDocument.applyStroke = true;
    // textDocument.applyFill = true;
    // textDocument.text = myString;
    // textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    // textLayer.property("Source Text").setValue(textDocument);

    
}