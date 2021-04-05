import Piece from "./Piece.js"
import {
    traverse_rows,
    traverse_cols
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

        const movable = {
            rows: rows,
            cols: cols
        }

        return movable
    }
}