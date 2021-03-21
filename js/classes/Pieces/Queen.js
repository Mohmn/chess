import Piece from "./Piece.js"


export default class Queen extends Piece {


    constructor(row,col,color,representation){
        super(row,col,color)
        this.representation = representation
    }

    canMoveTo(row,col, ChessBoard){
        console.log('not implmented yet')
    }
}