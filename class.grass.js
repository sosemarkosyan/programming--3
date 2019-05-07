//խոտի կլասը
class Grass extends LivingCreature{
    constructor(x, y,index) {
        super(x, y, index);
        this.energy = 5;
        

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