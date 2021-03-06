let LivingCreature = require('./class.Lc');
let Grass = require('./class.grass');
module.exports = class Predator extends LivingCreature{

    constructor(x, y,index) {
        super(x, y, index);
        this.energy = 1;
        

    }
    //շրջապատի հետազոտության մատրիցը
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }



    move() {
        //որոնում է դատարկ տարածքներ
        let foundCords = this.chooseCell(0);
        var cell = foundCords[Math.floor(Math.random()*foundCords.length)];

        if (cell) {
            let x = cell[0];
            let y = cell[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }


    //eat()-ուտել
    eat(m) {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let fundCords = this.chooseCell(2);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        //եթե կա հարմար սնունդ
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 3;
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
            for (let i in eaterArr) {
                if (x == eaterArr[i].x && y == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                }
            }


            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == m) {
                this.mul()
                this.multiply = 0;
            }


        }
        else {
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
            let predator = new Predator(x, y);
            predatorArr.push(predator);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 3;
            this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
               let grass=new Grass(this.x,this.y)
               grassArr.push(grass)

            }
        }
    }
}