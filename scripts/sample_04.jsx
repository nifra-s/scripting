#include "lib/json2.js"

// global vars
var myFile = new File;
var mainComp = undefined;
var subtitleComp = undefined;
var folderName = undefined;

var window = new Window("palette", "My Script", undefined);
window.orientation = "column";

var buttonOne = window.add("button", undefined, "Button 1");

buttonOne.onClick = function() {
    generateSub();
}

window.center();
window.show();

function generateSub(){
    // Get the activeItem if it's a composition
	mainComp = ( app.project.activeItem instanceof CompItem ) ? app.project.activeItem : null;

    // If there is no active composition, alert the user and exit this script
	if ( !mainComp ) {
		alert("Please select a composition first");
		return null;
	}

    subtitleComp = app.project.items.addComp("SubtitleComp", mainComp.width, mainComp.height, 1, 25, 25);
    subtitleComp.parent = mainComp;
    folderName = app.project.items.addFolder("placeHolder");
    readJson();

    var nestedCompLaye = mainComp.layers.add(subtitleComp);
}

function readJson() {
    myFile = new File("D:/Adobe/scripting/jasonfile.json");
    if(myFile.open("r")){
        myFile.encoding = "UTF-8";
        var myJson = myFile.read();
        var myObject = JSON.parse(myJson);
        myFile.close;
        for ( i = 0; true; i++){
            var subtitle = myObject.subtitle[i];
            if (subtitle == undefined){
                break;
            }
            addMyText(subtitle.text,parseFloat(subtitle.start),parseFloat(subtitle.end));
            //alert(subtitle.text);
        }
        
    }

}

function addMyText(myText,myInPoint,myOutPoint) {

        var comp = app.project.items.addComp(myText, mainComp.width*0.95, mainComp.height, 1, 25, 25);
        
        comp.parent = subtitleComp;
        var textLayer = comp.layers.addBoxText([comp.width,comp.height]);
        // textLayer.inPoint = myInPoint;
        // textLayer.outPoint = myOutPoint;
       
        var textDocument = new TextDocument(myText);
        textDocument = textLayer.property("Source Text").value;
        textDocument.text = myText;
        textLayer.property("Source Text").setValue(textDocument);

        var bounds = textLayer.sourceRectAtTime(myInPoint + 0.1, false);
        comp.width = Math.ceil(bounds.width);
        comp.height = Math.ceil(bounds.height);
        

        var nestedCompLayer = subtitleComp.layers.add(comp);
        // comp.timeSpanStart = 1.0;
        // comp.timeSpanDuration = 3.0;
        subtitleComp.layer(1).inPoint = myInPoint;
        subtitleComp.layer(1).outPoint = myOutPoint;

        nestedCompLayer.position.setValue([subtitleComp.width * 0.5, subtitleComp.height*0.95 - nestedCompLayer.sourceRectAtTime(myInPoint + 0.1,true).height*0.5]);
        comp.parentFolder = folderName;
}