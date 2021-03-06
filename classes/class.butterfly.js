let LivingCreature = require('./class.Lc');
let GrassEater = require('./class.grasseater')
module.exports = class Butterfly extends LivingCreature{

    constructor(x, y,index) {
        super(x, y, index);
        this.energy = 10;
        

    }

    //շրջապատի հետազոտության մատրիցը
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x - 3, this.y - 3],
            [this.x - 3, this.y + 3],
            [this.x + 3, this.y + 3],
            [this.x + 3, this.y - 3],
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    // eat() ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let fundCords = this.chooseCell(1);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];
        

        //եթե կա հարմար սնունդ
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }


            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 150) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }


    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        let foundCords = this.chooseCell(0);
        var cord = foundCords[Math.floor(Math.random()*foundCords.length)];

        //եթե կա բազմանում է
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            let butterfly = new Butterfly(x, y);
            butterflyArr.push(butterfly);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 5;
            this.multiply = 0; //????????
        }
    }
    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        let foundCords = this.chooseCell(0);
        var cell = foundCords[Math.floor(Math.random()*foundCords.length)];
       
        this.energy--;

        if (cell) {
            let x = cell[0];
            let y = cell[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }






    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն


        matrix[this.y][this.x] = 2;
        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (let i in butterflyArr) {
            if (this.x == butterflyArr[i].x && this.y == butterflyArr[i].y) {
                butterflyArr.splice(i, 1);
                let eater = new GrassEater(this.x, this.y)
                eaterArr.push(eater)

            }
        }
    }


}