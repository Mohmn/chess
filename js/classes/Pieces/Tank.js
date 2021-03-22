import Piece from "./Piece.js"
import {traverse_rows,traverse_cols} from "./traverse.js"

export default class Tank extends Piece {


    constructor(row,col,color,representation){
        super(row,col,color)
        this.representation = representation
    }

    canMoveTo(row,col, chessBoard){

    }

    availableMoves(row,col,chessBoard){
        const rows = traverse_rows(row,col,chessBoard)
        const cols = traverse_cols(row,col,chessBoard)

       const movable = {
            rows:rows,
            cols:cols
        }

        return movable
    }
}