var detectando = false
var objetos = []
var objetoencontrado = false

function setup() {
    canvas = createCanvas(640, 320);
    background("white");
    canvas.center();
    video.size(640, 320)
    video.hide()
    cocossd = ml5.objectDetector("cocossd", listo)
}

function preload() {
    video = createVideo("video.mp4")
}

function draw() {
    image(video, 0, 0, 640, 320)
    if (detectando == true) {
        cocossd.detect(video, resultados)
        buscado = document.getElementById("input").value
        for (let index = 0; index < objetos.length; index++) {
            const element = objetos[index];
            if (element.label == buscado) {
                objetoencontrado = true
            }
            stroke("red");
            noFill();
            strokeWeight(2);
            rect(element.x, element.y, element.width, element.height);
            stroke("black");
            fill("white");
            strokeWeight(4);
            textSize(15);
            percentage = Math.round(element.confidence * 100);
            text(element.label + " " + percentage + "%", element.x, element.y);
        }
        if (objetoencontrado==true) {
            document.getElementById("Mostrando").innerHTML = "Se a encontrado: " + buscado
        } else {
            document.getElementById("Mostrando").innerHTML = "No se encontro :( 😭😭😭"
        }
        objetoencontrado=false
    }
}

function listo() {
    console.log("Hola :D")
}

function comenzar() {
    video.loop()
    video.volume(0)
    detectando = true;
    document.getElementById("estatus").innerHTML = "Se estan detectando objetos 📦"
}

function resultados(error, lista) {
    if (!error) {
        objetos = lista
    }
}