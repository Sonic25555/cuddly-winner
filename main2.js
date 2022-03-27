img="";
status = "";
object=[];
function preload(){
    img=loadImage("https://www.cdc.gov/importation/images/cat.jpg");
}
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
function draw(){
    image(img,0,0,380,380);
    if(status!=""){
        objectDetector.detect(img,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML="Number of objects detected : "+object.length;
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function back(){
    window.location = "index.html";
    }