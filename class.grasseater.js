//խոտակերի կլասը
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 8;
        this.directions = [];
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
        let f = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    f.push(this.directions[i]);
                }
            }
        }
        return f;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        let foundCell = this.chooseCell(0);
        let cell = random(foundCell);

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
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let foundCell = this.chooseCell(1);
        let cell = random(foundCell);

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

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                   
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 5) {
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
        let cell = random(foundCell);

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