export default class Piece{

    constructor(row,col,color){
        this.row = row
        this.col = col
        this.color = color
    }

    getRow(){
        return this.row
    }

    getCol(){
        return this.col
    }

    moveTo(row,col){
        this.row = row
        this.col = col
    }
}