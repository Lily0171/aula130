som = "";
esquerdox = 0;
esquerdoy = 0;
direitox = 0;
direitoy = 0;
scorreesquerdo = 0;
scorredireito = 0;
function preload() {
    som = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoad);
    posenet.on("pose", gotPoses);
}
function modelLoad() {
    console.log("o modelo foi carregado");
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#525252");
    stroke("#525252");
    if (scorreesquerdo > 0.2) {
        circle(esquerdox, esquerdoy, 20);
        pulso = Number(esquerdoy);
        decimal = floor(pulso);
        volume = decimal / 500;
        document.getElementById("volume").innerHTML = "volume =" + volume;
        som.setVolume(volume);
    }
    if (scorredireito > 0.2) {
        circle(direitox, direitoy, 20);
     if(direitoy > 0 && direitoy <= 100) {
        document.getElementById("speed").innerHTML = "velocidade = 0.5x";
        som.rate(0.5);
     }
     else  if(direitoy > 100 && direitoy <= 200) {
        document.getElementById("speed").innerHTML = "velocidade = 1x";
        som.rate(1);
     }
     else  if(direitoy > 200 && direitoy <= 300) {
        document.getElementById("speed").innerHTML = "velocidade = 1.5x";
        som.rate(1.5);
     }
     else  if(direitoy > 300 && direitoy <= 400) {
        document.getElementById("speed").innerHTML = "velocidade = 2x";
        som.rate(2);
     }
     else  if(direitoy > 400) {
        document.getElementById("speed").innerHTML = "velocidade = 2.5x";
        som.rate(2.5);
     }
    }
}
function play() {
    som.play();
    som.setVolume(1);
    som.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        direitox = results[0].pose.rightWrist.x;
        direitoy = results[0].pose.rightWrist.y;
        esquerdox = results[0].pose.leftWrist.x;
        esquerdoy = results[0].pose.leftWrist.y;
    }
}