song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
InNumberleftWristY=0;
remove_decimals=0;
volume=0;
function preload(){
song=loadSound('music.mp3');
}
function setup(){
canvas=createCanvas(500,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();


pose=ml5.poseNet(video,modelloaded);
pose.on('pose',gotposes);
}

function modelloaded(){
    console.log('posenet is loaded');
}

function draw(){
image(video,0,0,500,500);
fill('#c3eb34');
stroke('#f74f25');
circle(rightWristX,rightWristY, 20);

if(scorerightWrist>0.2){
    if(rightWristY>0 && rightWristY<=100){
        song.rate(0.5);
        document.getElementById("Speed").innerHTML="Speed=0.5x";
    }
    else if(rightWristY>100 && rightWristY<=200){
        song.rate(1);
        document.getElementById("Speed").innerHTML="Speed=1x";
    }
    else if(rightWristY>200 && rightWristY<=300){
        song.rate(1.5);
        document.getElementById("Speed").innerHTML="Speed=1.5x";
    }
    else if(rightWristY>300 && rightWristY<=400){
        song.rate(2);
        document.getElementById("Speed").innerHTML="Speed=2x";
    }
    else if(rightWristY>400 && rightWristY<=500){
        song.rate(2.5);
        document.getElementById("Speed").innerHTML="Speed=2.5x";
    }
}


circle(leftWristX,leftWristY,20);
InNumberleftWristY= Number(leftWristY);
remove_decimals=floor(InNumberleftWristY);
volume=remove_decimals/500;
document.getElementById("volume").innerHTML="volume="+volume;
song.setVolume(volume);
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);

}

function gotposes(results){
if(results.length>0){
    console.log(results);
    scorerightWrist=results[0].pose.keypoints[10].scorerightWrist;
    scoreleftWrist=results[0].pose.keypoints[9].scoreleftWrist;
    console.log("scoreleftWrist="+scoreleftWrist+"scoreleftWrist="+scoreleftWrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+",leftWristY="+leftWristY);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+",rightWristY="+rightWristY);
}
}

function stop()
{
    song.stop();
}


