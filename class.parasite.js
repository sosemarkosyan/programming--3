class Parasite extends LivingCreature{

    constructor(x, y,index) {
        super(x, y, index);
        this.energy = 3;
        

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
    getnewDirections() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y],
            [this.x - 1, this.y],
            [this.x, this.y - 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y],
            [this.x - 2, this.y],
            [this.x, this.y - 3],
            [this.x, this.y + 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
        ];
    }
    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }
    choosecell() {
        this.getnewDirections();
        let fond = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    fond.push(this.directions[i]);
                }
            }
        }
        return fond;
    }


    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        let foundCords = this.chooseCell(0);
        let cell = random(foundCords);

        if (cell) {
            let x = cell[0];
            let y = cell[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;

        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let fundCords = this.choosecell();
        let cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            
            if (matrix[y][x] == 2) {
                for (let i in eaterArr) {
                    if (x == eaterArr[i].x && y == eaterArr[i].y) {
                        eaterArr.splice(i, 1);
    
                    }
                }
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;
    
                //փոխում է սեփական կորդինատները օբյեկտի մեջ
                this.x = x;
                this.y = y;
    
                //բազմացման գործակիցը մեծացնում է
                this.multiply++;
    
                //մեծացնում է էներգիան
                this.energy++;
            }
            else if (matrix[y][x] == 3) {
                for (let i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
    
                    }
                }
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;
    
                //փոխում է սեփական կորդինատները օբյեկտի մեջ
                this.x = x;
                this.y = y;
    
                //բազմացման գործակիցը մեծացնում է
                this.multiply++;
    
                //մեծացնում է էներգիան
                this.energy++;
            }
            
            
            
           

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 100) {
                this.mul()
                this.multiply = 0;
            }


        }
         else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.change();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        let foundCords = this.chooseCell(0);
        let cord = random(foundCords);

        //եթե կա բազմանում է
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            this.multiply++;

            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            let parasite = new Parasite(x, y, this.index);
            parasiteArr.push(parasite);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 4;
            this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    change() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 2;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (let i in parasiteArr) {
            if (this.x == parasiteArr[i].x && this.y == parasiteArr[i].y) {
                parasiteArr.splice(i, 1);
                let eater = new GrassEater(this.x, this.y)
                eaterArr.push(eater)
            }
        }
    }

}