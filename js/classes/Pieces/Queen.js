import Piece from "./Piece.js"
import {
    traverse_cols,
    traverse_rows,
    traverse_diagonals
} from "./traverse.js"

export default class Queen extends Piece {


    constructor(row, col, color, representation) {
        super(row, col, color)
        this.representation = representation
    }
    
    // canMoveTo(row, col, chessBoard) {

    // }
    canMoveto(row, col, movableMoves) {
        // if row,col in availableMoves

        return this.canMoveToDiag(row,col,{diags:movableMoves['diags']}) || 
            this.canMoveToRowCol(row,col,{rows:movableMoves['rows'],cols:movableMoves['cols']}) 
       
    }

    canMoveToRowCol(row, col, movableMoves) {
        // if row,col in availableMoves

        if ((this.getCol() === col) && (this.getRow() === row))
            return false

        let arr_to_see = null
        // only need to comapare on same rows and cols
        if (this.getRow() == row) {

            // l_r r_r both are sorted
            const left_row = movableMoves['rows'][0]
            try {
                if (col > left_row[0][1])
                    arr_to_see = movableMoves['rows'][1]
                else
                    arr_to_see = left_row
            } catch (TypeError) {
                // used here bcz left_row can be of length 0
                arr_to_see = movableMoves['rows'][1]
            }
        } else {

            // l_c r_c both are sorted
            try {
                const left_col = movableMoves['cols'][0]
                if (row > left_col[0][0])
                    arr_to_see = movableMoves['cols'][1]
                else
                    arr_to_see = left_col
            } catch (TypeError) {
                arr_to_see = movableMoves['cols'][1]
            }
        }
        
        return this.pos_in_arr(row, col, arr_to_see)
    }

    canMoveToDiag(row, col, movableMoves) {
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



    availableMoves(chessBoard) {
        const row=this.getRow(),col = this.getCol()
        const rows = traverse_rows(row, col, chessBoard, this.color)
        const cols = traverse_cols(row, col, chessBoard, this.color)
        const diags = traverse_diagonals(row, col, chessBoard, this.color)
        const movable = {
            rows: rows,
            cols: cols,
            diags: diags
        }

        return movable
    }
}