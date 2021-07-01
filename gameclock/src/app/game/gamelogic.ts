import { Status } from "./gamestatus";

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn?: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [
        //rows
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [,0,0,0,0,0,1,1,1],
        //colums
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        //diaganol
        [0,0,1,0,1,0,1,0,0],
        [1,0,0,0,1,0,0,0,1],

    ];

    winSituationsTwo: Array<Array<number>> = [
        //rows
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [,0,0,0,0,0,2,2,2],
        //colums
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        //diaganol
        [0,0,2,0,2,0,2,0,0],
        [2,0,0,0,2,0,0,0,2],

    ];

    public constructor(){
        this.gameStatus = Status.STOP;
        this.gameField = [0,0,0,0,0,0,0,0,0];
    }

    gameStart(): void{
        this.gameField = [0,0,0,0,0,0,0,0,0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.START;

    }

    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() * 2) +1;
        return startPlayer;

    }

    setField(position: number, value: number): void{
        this.gameField[position] = value;
    }

    getPlayerColorClass(): string{
        const coloClass = (this.currentTurn ===2) ? 'player-two' : 'player-one';
        return coloClass
    }

    changePlayer(): void{
        this.currentTurn = (this.currentTurn ===2) ? 1 : 2
    }

    gameOver(): void{
        this.gameStatus = Status.STOP;
    }

    arraysEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
         a.every((value, index) => value === b[index]);
    }
    

    async checkGameEndWinner() : Promise<boolean> {
        let isWinner = false;

        const checkWinner = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;

        const currentWinner = [];

        this.gameField.forEach((subfield, index) =>{
            if(subfield !== this.currentTurn){
                currentWinner[index] = 0;
            }
            else{
                currentWinner[index] = subfield;
            }
        });

        checkWinner.forEach((checkField, checkIndex) => {
            if(this.arraysEquals(checkField,currentWinner)){
                isWinner = true;
            }
        });

        if(isWinner){
            this.gameOver();
            return true;
        }
        else
            return false;
    }

    async checkGameEndFull() : Promise<boolean> {
        let isFull = true;

        if(this.gameField.includes(0)){
            isFull = false;
        }

        if(isFull){
            this.gameOver();
            return true;
        }
        else
            return false;
    }
}
