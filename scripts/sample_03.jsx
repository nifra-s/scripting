var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var buttonOne = window.add("button", undefined, "Button 1");

buttonOne.onClick = function() {
    addMyText("To add this code to your After Effects project, you can create a new composition and then open the Scripts panel by going to Window > Utilities > Scripts. From the Scripts panel, you can click the Browse button to locate and select the script file on your computer, then click Run to execute the script.",0,20);
}

window.center();
window.show();

function addMyText(myText,myInPoint,myOutPoint) {

    // Get the activeItem if it's a composition
	var mainComp = ( app.project.activeItem instanceof CompItem ) ? app.project.activeItem : null;

    // If there is no active composition, alert the user and exit this script
	if ( !comp ) {
		alert("Please select a composition first");
		return null;
	}
    
    var subtitleComp = app.project.items.addComp("SubtitleComp", mainComp.width, mainComp.height, 1, 25, 25);
    subtitleComp.parent = mainComp;

    var folderName = app.project.items.addFolder("placeHolder");
    for(var i = 1;i<10;i++){

        var comp = app.project.items.addComp(i, mainComp.width*0.95, mainComp.height, 1, 25, 25);
        comp.parent = subtitleComp;
        var textLayer = comp.layers.addBoxText([comp.width,comp.height]);
        
        textLayer.inPoint = myInPoint;
        textLayer.outPoint = myOutPoint;
       
        var textDocument = new TextDocument(myText);
        textDocument = textLayer.property("Source Text").value;
        textDocument.text = myText;
        textLayer.property("Source Text").setValue(textDocument);
        var bounds = textLayer.sourceRectAtTime(myInPoint + 0.1, false);
        comp.width = Math.ceil(bounds.width);
        comp.height = Math.ceil(bounds.height);
        var nestedCompLayer = subtitleComp.layers.add(comp);

        nestedCompLayer.position.setValue([subtitleComp.width * 0.5, subtitleComp.height*0.95 - nestedCompLayer.sourceRectAtTime(myInPoint + 0.1,true).height*0.5]);
        comp.parentFolder = folderName;
    }
    
    var nestedCompLaye = mainComp.layers.add(subtitleComp);
}