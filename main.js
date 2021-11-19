img = "";
status = "";
objects = [];
audio ="audio.mp3";

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "" && object[i].label == "person")
    {

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of objects are : " + objects.length;
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        document.getElementById("identify").innerHTML = "Human Found! :)"
    }

    else
    {
        audio.play();
        document.getElementById("identify").innerHTML = "Human Not Found! :("
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}