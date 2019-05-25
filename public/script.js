let side = 25;
let socket = io();


function setup() {

    createCanvas(500, 500);
    background('#acacac');

}
socket.on("send matrix", drawMatrix)
exanak = "dzmer";
var weatherP = document.getElementById("weather")

var ex = socket.on("exanaks", function (w) {
    exanak = w;
    weatherP = exanak;
});

function drawMatrix(matrix) {
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (exanak == "garun") {
                    fill("green");
                }
                else if (exanak == "amar") {
                    fill(21, 234, 14)
                }
                else if (exanak == "ashun") {
                    fill(198, 232, 76)
                }
                else if (exanak == "dzmer") {
                    fill("white")
                }
            }
            else if (matrix[y][x] == 2) {
                if (exanak == "garun") {
                    fill("orange");
                }
                else if (exanak == "amar") {
                    fill(255, 220, 0)
                }
                else if (exanak == "ashun") {
                    fill(216, 189, 93)
                }
                else if (exanak == "dzmer") {
                    fill(255, 204, 168)
                }
            }
            else if (matrix[y][x] == 3) {
                if (exanak == "garun") {
                    fill("red");
                }
                else if (exanak == "amar") {
                    fill(255, 0, 139)
                }
                else if (exanak == "ashun") {
                    fill(255, 91, 86)
                }
                else if (exanak == "dzmer") {
                    fill(232, 195, 194)
                }
            }

            
            else if (matrix[y][x] == 4) {
                if (exanak == "garun") {
                    fill("grey");
                }
                else if (exanak == "amar") {
                    fill(158, 158, 158)
                }
                else if (exanak == "ashun") {
                    fill(178, 186, 187)
                }
                else if (exanak == "dzmer") {
                    fill(224,224,224)
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#cecece");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('pink');
                rect(x * side, y * side, side, side);
            }
            rect(x * side, y * side, side, side);
        }
    }




}
function spanel() {
    socket.emit('spanii')
}
function poxel() {
    socket.emit('poxii')
}