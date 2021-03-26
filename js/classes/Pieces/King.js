import Piece from "./Piece.js"

export default class King extends Piece {

    constructor(row, col, color, representation) {
        super(row, col, color)
        this.representation = representation
    }

     // canMoveTo[row, col, chessBoard) {

    // }


    canMoveto(row, col, movableMoves) {
      
        for(const array of movableMoves['moves']){
            if(array[0][0] == row){
                for(const arr of array){
                    if( (arr[0] === row ) && (arr[1] === col) )
                        return true
                }
            }
        }

        return false
    }


    availableMoves(row, col, chessBoard) {

        let x = row,y = col,moves = []

        if (row - 1 >= 0)
            x = row - 1
        if (col - 1 >= 0)
            y = col - 1

        let x_lim = chessBoard.size,
            y_lim = chessBoard.size

        if (row + 2 < chessBoard.size)
            x_lim = row + 2
        if (col + 2 < chessBoard.size)
            y_lim = col + 2

        for (let i = x; i < x_lim; i++) {
            const arr = []
            for (let j = y; j < y_lim; j++) {

                if (!chessBoard.board[i][j])
                    arr.push([i, j])
                else if(chessBoard.board[i][j].color !== this.color)
                    arr.push([i, j])
            }

            moves.push(arr)
        }

        const movable = {
            
            moves : moves
        }

        return movable

    }

}