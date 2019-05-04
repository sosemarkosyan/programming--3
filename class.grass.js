//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
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
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 1) {

            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            let fundCords = this.chooseCell(0);
            let cord = random(fundCords);
            if (cord) {
                let x = cord[0];
                let y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                let grass = new Grass(x, y);
                grassArr.push(grass);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}