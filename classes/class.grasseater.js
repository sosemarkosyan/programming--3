let LivingCreature = require('./class.Lc.js');
module.exports = class GrassEater extends LivingCreature{
     constructor(x, y,index) {
        super(x, y, index);
        this.energy = 8;
        

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



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        let foundCell = this.chooseCell(0);
        var cell = foundCell[Math.floor(Math.random()*foundCell.length)];

        if (cell) {
            let x = cell[0];
            let y = cell[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }


    //eat()-ուտել
    eat(m) {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let foundCell = this.chooseCell(1);
        var cell = foundCell[Math.floor(Math.random()*foundCell.length)];

        //եթե կա հարմար սնունդ
        if (cell) {
            let x = cell[0];
            let y = cell[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

          
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == m) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 8֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        let foundCell = this.chooseCell(0);
        var cell = foundCell[Math.floor(Math.random()*foundCell.length)];

        //եթե կա բազմանում է
        if (cell) {
            let x = cell[0];
            let y = cell[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            let eater = new GrassEater(x, y);
            eaterArr.push(eater);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին

            matrix[y][x] = 2;
            this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 1;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (let i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1);
                
            }
        }
    }

}