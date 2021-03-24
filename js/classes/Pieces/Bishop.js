import Piece from "./Piece.js"
import {
   traverse_diagonals
} from "./traverse.js"

export default class Tank extends Piece {


    constructor(row, col, color, representation) {
        super(row, col, color)
        this.representation = representation
    }

    // canMoveTo(row, col, chessBoard) {

    // }

    // movalbleMoves actually passes object of cols and rows
    // and each col and row are both composed of left_row ,right_row and right_col,left_col
    // each of the rows and cols are sorted
    // so binary search can be used
    // 
    canMoveto(row, col, movableMoves) {
        pass
    }



    availableMoves(row, col, chessBoard) {
        const diagonals = traverse_fiagonals(row, col, chessBoard, this.color)
        
        const movable = {
            diags: diagonals
        }

        return movable
    }
}