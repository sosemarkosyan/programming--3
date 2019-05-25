grassArr = [];
eaterArr = [];
predatorArr = [];
parasiteArr = [];
butterflyArr = [];

var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = []

function generateMatrix(lengthY, lengthX, number) {

    matrix = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    for (let y = 0; y < lengthY; y++) {
        matrix.push([]);
        for (let x = 0; x < lengthX; x++) {
            let randomCount = getRandomInt(number);
            matrix[y].push(randomCount);
        }
    }
    return matrix;

}
matrix = generateMatrix(20, 20, 6);
io.sockets.emit("drawmatrix", matrix)
var Grass = require('./classes/class.grass.js')
var GrassEater = require('./classes/class.grasseater.js')
var Predator = require('./classes/class.predator.js')
var Parasite = require('./classes/class.parasite.js')
var Butterfly = require('./classes/class.butterfly.js')




function game() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                eaterArr.push(eater);
            } else if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y)
                predatorArr.push(predator)
            }
            else if (matrix[y][x] == 4) {
                let parasite = new Parasite(x, y)
                parasiteArr.push(parasite)
            }
            else if (matrix[y][x] == 5) {
                let butterfly = new Butterfly(x, y)
                butterflyArr.push(butterfly)
            }
        }
    }
}



game()
setInterval(Drawmatrix, 500)
takt = 0
exanak = "dzmer";
weather = ["garun", "amar", "ashun", "dzmer"]
function Drawmatrix() {
    takt++;
    if (takt <= 20) {
        exanak = weather[0];
    }
    else if (takt <= 40) {
        exanak = weather[1]
    }
    else if (takt <= 60) {
        exanak = weather[2]
    }
    else if (takt <= 80) {
        exanak = weather[3]
    }
    else {
        takt = 0;
    }

    for (let i in grassArr) {
        grassArr[i].mul();


    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (let i in eaterArr) {
        if (exanak == "garun") {
        eaterArr[i].eat(10);
        eaterArr[i].mul()
        }
        
        else if (exanak =="amar") {
            eaterArr[i].eat(5);
            eaterArr[i].mul()
        }
        else if (exanak =="ashun") {
            eaterArr[i].eat(15);
            eaterArr[i].mul()
        }
        else if (exanak =="dzmer") {
            eaterArr[i].eat(20);
            eaterArr[i].mul()
        }
    }
    for (let i in predatorArr) {
        
        if (eghanak = "garun") {
             predatorArr[i].mul()  ;
             predatorArr[i].eat(80);
          
        }
        else if (eghanak = "amar") {
            predatorArr[i].eat(70);
            predatorArr[i].mul()
        }
        else if (eghanak = "ashun") {
            predatorArr[i].eat(90);
            predatorArr[i].mul()
        }
        else if (eghanak = "dzmer") {
            predatorArr[i].eat(100);
            predatorArr[i].mul()
        }
    }
    for (let i in parasiteArr) {
        parasiteArr[i].mul()
        parasiteArr[i].eat()

    }
    for (let a in butterflyArr) {
        butterflyArr[a].mul()
        butterflyArr[a].eat()
        butterflyArr[a].die()
    }
    console.log(exanak)
    io.sockets.emit("send matrix", matrix)
    io.sockets.emit("exanaks", exanak);
}
let statistics = {}

setInterval(function(){
    statistics.xotArr = grassArr.length
    statistics.eatArr = eaterArr.length
    statistics.gishatichArr = predatorArr.length
    statistics.parArr = parasiteArr.length
    statistics.titerArr = butterflyArr.length
    fs.writeFileSync("statistics.JSON", JSON.stringify(statistics));

} ,10)


function xekhdel() {
    prodatorArr = [];
    eaterArr = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            matrix[y][x] = 0
        }
    }
}

io.on('connection', function (socket) {
    socket.on('spanii', xekhdel)
});
function change() {
    eaterArr = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            matrix[y][x] = 1
        }
    }
}
io.on('connection', function (socket) {
    socket.on('poxii', change)
});