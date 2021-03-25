import Piece from "./Piece.js"

export default class Knight extends Piece {


    constructor(row, col, color, representation) {
        super(row, col, color)
        this.representation = representation
    }

    // canMoveTo[row, col, chessBoard) {

    // }

    // l_shape 
    // row +- 2,col +- 1
    // row +- 1,col +- 2

    canMoveto(row, col, movableMoves) {


        // tyring to figure out if forms an L_shapei 
        // this method wouldn'd work becz it would had also req to check color of the pieces
        // if( (row === (this.getRow()+2)) || (row === (this.getRow()-2)) ){
        //     if((col === (this.getCol()+1)) || (col === (this.getCol()-1)) ){
        //         if()

        //     }
                
        //         return  true
        // }

        // if( (col === (this.getCol()+2)) || (col === (this.getCol()-2)) ){
        //     if((row === (this.getRow()+1)) || (row === (this.getRow()-1)) )
        //         return  true
        // }

        const arr_to_see = movableMoves['l_shapes'][0]
        for (const arr of arr_to_see) {
            if ((arr[0] === row) && (arr[1] === col)) {
                return true
            }
        }

        return false
    }



    // to do optimize it more
    // remove hardcoded l_shaped coordinates
    availableMoves(row, col, chessBoard) {
        let moves = []
        // l shapes
        // max num of l_shapes chess piece can make it is 8
        // so i hardcorded it for now
        let l_shape_coord = [
            [-2, +1],[-2, -1],[+2, +1],[+2, -1],[-1, +2],[-1, -2],[+1, +2],[+1, -2]
        ]

    
        l_shape_coord.map(pos => {
            let x = row + pos[0]
            let y = col + pos[1]
            if ( ( (x >= 0 ) && (x < chessBoard.size) ) && ((y >= 0 ) && (y < chessBoard.size)) ) {

                if (!chessBoard.board[x][y])
                    moves.push([x, y])
                else if(chessBoard.board[x][y].color !== this.color)
                    moves.push([x, y])
            }
        })

        const movable = {
            // the reason i made it an array of arrays was to get it compitable with chessDisplays showpath method
            l_shapes :[ moves]
        }

        return movable
    }

}