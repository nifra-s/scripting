var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var buttonOne = window.add("button", undefined, "Button 1");

buttonOne.onClick = function() {
    addMyText("Nifras",0,20);
    //addMyComp();
}

window.center();
window.show();

// Create New folder
// function addMyFolder(name) {

//     folderName = app.project.items.addFolder(name);

// }

// Create New Comp
function addMyComp(name) {

    
    return comp.id

}

// Create New Text Layer
function addMyText(myText,myInPoint,myOutPoint) {
    var mainComp = app.project.activeItem;
    
    if(mainComp == null || !(mainComp instanceof CompItem)) {
        alert("Please select a composition first");
        return false;
    }

    var folderName = app.project.rootFolder.items.addFolder("placeHolder");
    comp = app.project.rootFolder.items.addComp("name", 1920, 1080, 1.0, 20, 29.97);
    app.project.itemByID(comp.id).parentFolder = folderName;

    myTextLayer = comp.layers.addBoxText([mainComp.width,mainComp.height]);
    myTextLayer.inPoint = myInPoint;
    myTextLayer.outPoint = myOutPoint;

    var textDocument = new TextDocument("myText");
    textDocument = myTextLayer.property("Source Text").value;
    textDocument.text = myText;
    textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    myTextLayer.property("Source Text").setValue(textDocument);
    comp.height = math.floor(myTextLayer.sourceRectAtTime(0,true).height);

    //myTextLayer.position.setValue([comp.width*0.5, comp.height - myTextLayer.sourceRectAtTime(0,true).height])
    mainComp.items.add(comp);
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