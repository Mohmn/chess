export default class ChessBoard {

    size = 8

    constructor() {

        this.board = []

        for (let i = 0; i < this.size; i++) {
            this.board.push([])
            for (let j = 0; j < this.size; j++) {
                this.board[i].push(null)
            }
        }

        
    }

    isFilled(row,col){
        return this.board[row][col] !== null
    }
    pieceAt(row,col){
        return this.board[row][col]
    }

    addPiece(Piece){

        this.board[Piece.row][Piece.col] = Piece

    }

    removePiece(row,col){

        this.board[row][col] = null
    }

}