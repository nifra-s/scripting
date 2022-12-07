var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var buttonOne = window.add("button", undefined, "Button 1");

buttonOne.onClick = function() {
    addMyText("Nifras",5,20);
}

window.center();
window.show();

// Comp/Layer Stuff
function addMyText(myText,myInPoint,myOutPoint) {
    comp = app.project.activeItem
    if(comp == null || !(comp instanceof CompItem)) {
        alert("Please select a composition first");
        return false;
    }

    myTextLayer = comp.layers.addText("myText");
    myTextLayer.inPoint = myInPoint;
    myTextLayer.outPoint = myOutPoint;

    var textDocument = new TextDocument("myText");
    textDocument = myTextLayer.property("Source Text").value;
    textDocument.text = myText;
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;

    myTextLayer.property("Source Text").setValue(textDocument);

    myTextLayer.position.setValue([comp.width*0.5, comp.height - myTextLayer.sourceRectAtTime(0,true).height])
}

// function importFileAndStuff() {
//     var videoFile = File("~/Videos/test.mp4");
//     var videoItem = app.project.importFile(new ImportOptions(videoFile));

//     var videoLayer;

//     for(var i = 1; i <= 5; i++) {
//     videoLayer = app.project.activeItem.layers.add(videoItem);
//     videoLayer.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(i, 0);
//     videoLayer.property("ADBE Transform Group").property("ADBE Opacity").setValueAtTime(i+1, 100);
//     }

//     app.project.renderQueue.items.add(app.project.activeItem);
// }