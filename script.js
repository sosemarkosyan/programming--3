let side = 25;
let grassArr = []; //խոտերի զանգված
let eaterArr = []; //խոտակերների զանգված
let predatorArr = [];
let parasiteArr = [];
let butterflyArr = []

function generateMatrix(lengthY, lengthX, number) {

    let matrix = [];

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

let matrix = generateMatrix(20, 20, 6);



function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
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

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#cecece');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#cecece');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("grey");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('pink');
                rect(x * side, y * side, side, side);
            }
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (let i in grassArr) {
        grassArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (let i in eaterArr) {
        eaterArr[i].mul()
        eaterArr[i].eat();

    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()

    }
    for (let i in parasiteArr) {
        parasiteArr[i].mul()
        parasiteArr[i].eat()

    }
    for (let a in butterflyArr) {
        butterflyArr[a].mul()
        butterflyArr[a].eat()

    }
    if (grassArr == 0) {
        matrix[0][0] == 1
        let grass = new Grass(0, 0);
        grassArr.push(grass);
    }
}