import Piece from "./Piece.js"
import {
    traverse_diagonals
} from "./traverse.js"

export default class Bishop extends Piece {


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
        // leftUpperDiag, rightLowerDiag, leftLowerDiag, rightUpperDiag

        const leftUpperDiag = movableMoves['diags'][0]
        if (this.getRow() > row && this.getCol() > col)
            return this.pos_in_arr(row, col, leftUpperDiag)

        const rightLowerDiag = movableMoves['diags'][1]
        if (row > this.getRow() && col > this.getCol())
            return this.pos_in_arr(row, col, rightLowerDiag)

        const leftLowerDiag = movableMoves['diags'][2]
        if (this.getRow() < row && this.getCol() > col)
            return this.pos_in_arr(row, col, leftLowerDiag)

        return this.pos_in_arr(row, col, movableMoves['diags'][3])

    }



    pos_in_arr(row, col, arr_to_see) {
       
        for (const arr of arr_to_see) {
            if ((arr[0] === row) && (arr[1] === col)) {
                return true
            }
        }

        return false
    }

    availableMoves(chessBoard,isInCheck) {
        const row=this.getRow(),col = this.getCol()
        const diagonals = traverse_diagonals(row, col, chessBoard, this.color)

        const movable = {
            diags: diagonals
        }

        for(let dimensions in movable){

            for(let i=0;i<movable[dimensions].length;i++){
                movable[dimensions][i] = movable[dimensions][i].filter(pos =>
                    !this.moveWouldCauseCheck(pos[0],pos[1],chessBoard,isInCheck))
            }
        }
        
        return movable
    }
}