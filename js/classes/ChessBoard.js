import Queen from "./Pieces/Queen.js"
import King from "./Pieces/King.js"
import Tank from "./Pieces/Tank.js"
import Bishop from "./Pieces/Bishop.js"
import Knight from "./Pieces/Knight.js"
import Pawn from "./Pieces/Pawn.js"

export default class ChessBoard {


    constructor(color1, color2) {

        this.board = []
        this.size = 8
        // did it so that it would take o(1) time for finding king in the check method
        this.king1 = {
            location: [0, 4], // default loc of king
            color: color1
        }
        this.king2 = {
            location: [7, 4], // default loc of king
            color: color2
        }
        this.place_pieces()

    }

    // initial configuration
    place_pieces() {

        let color = this.king1['color']
        this.board.push([new Tank(0, 0, color, "Rk"), new Knight(0, 1, color, "Knt"), new Bishop(0, 2, color, "bsh"), new Queen(0, 3, color, "Q"), new King(0, 4, color, "K"), new Bishop(0, 5, color, "bsh"), new Knight(0, 6, color, "Knt"), new Tank(0, 7, color, "Rk")])
        this.board.push([])
        for (let i = 0; i < this.size; i++)
            this.board[1].push(new Pawn(1, i, color, "P"))
        for (let i = 2; i < 6; i++) {
            this.board.push([])
            for (let j = 0; j < this.size; j++)
                this.board[i].push(null)
        }
        color = this.king2['color']
        this.board.push([])
        for (let i = 0; i < this.size; i++)
            this.board[6].push(new Pawn(6, i, color, "P"))
        this.board.push([new Tank(7, 0, color, "Rk"), new Knight(7, 1, color, "Knt"), new Bishop(7, 2, color, "bsh"), new Queen(7, 3, color, "Q"), new King(7, 4, color, "K"), new Bishop(7, 5, color, "bsh"), new Knight(7, 6, color, "Knt"), new Tank(7, 7, color, "Rk")])
        // console.log(this.board)
    }

    empty_board() {
        for (let i = 0; i < 8; i++) {
            this.board.push([])
            for (let j = 0; j < this.size; j++) {
                this.board[i].push(null)
            }
        }
    }

    isFilled(row, col) {
        return this.board[row][col] !== null
    }

    opponentPlayer(row, col, color) {
        return this.pieceAt(row, col).color !== color
    }
    pieceAt(row, col) {
        return this.board[row][col]
    }

    addPiece(Piece) {
    
        this.board[Piece.row][Piece.col] = Piece

    }

    removePiece(row, col) {

        this.board[row][col] = null
    }

    updateKingLoc(king) {
        if (king.color === this.king1.color)
            this.king1.location = [king.getRow(), king.getCol()]
        else
            this.king2.location = [king.getRow(), king.getCol()]

    }
}