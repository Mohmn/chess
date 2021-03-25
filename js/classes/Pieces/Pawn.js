import Piece from "./Piece.js"

export default class Pawn extends Piece {

    constructor(row, col, color, representation) {
        super(row, col, color)
        this.representation = representation
            // on first move pawn can move two positions
            this.firstMove = true
        // using this variable to figure out wheter to up or down the pawn 
        // if the starting pos of the pawn is 0 it means that it has to move move Downwards
        // else it has to move upwards   

        if (row == 0)
            this.moveUp = false
        else
            this.moveUp = true
    }



    availableMoves(row, col, chessBoard) {

        let moves = [this.moveUpwards(row, col, chessBoard)]
        console.log(moves)
        const movable = {

            moves: moves
        }
       return movable

    }

    
    moveUpwards(row, col, chessBoard) {
        let PlayableMoves = []
        if ((col > 0) && col < (chessBoard.size - 1)) {

            if (this.firstMove) {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
                if (!chessBoard.isFilled(row - 2, col))
                    PlayableMoves.push([row - 2, col])

                this.firstMove = false
            } else {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
            }

            if (chessBoard.isFilled(row - 1, col - 1) && chessBoard.opponentPlayer(row - 1, col - 1, this.color))
                PlayableMoves.push([row - 1, col - 1])
            if (chessBoard.isFilled(row - 1, col + 1) && chessBoard.opponentPlayer(row - 1, col + 1, this.color))
                PlayableMoves.push([row - 1, col + 1])

            return PlayableMoves
        } else if (col === 0) {
            if (this.firstMove) {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
                if (!chessBoard.isFilled(row - 2, col))
                    PlayableMoves.push([row - 2, col])

                this.firstMove = false
            } else {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
            }

            if (chessBoard.isFilled(row - 1, col + 1) && chessBoard.opponentPlayer(row - 1, col + 1, this.color))
                PlayableMoves.push([row - 1, col + 1])

            return PlayableMoves
        } else {

            if (this.firstMove) {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
                if (!chessBoard.isFilled(row - 2, col))
                    PlayableMoves.push([row - 2, col])

                this.firstMove = false
            } else {

                if (!chessBoard.isFilled(row - 1, col))
                    PlayableMoves.push([row - 1, col])
            }

            if (chessBoard.isFilled(row - 1, col - 1) && chessBoard.opponentPlayer(row - 1, col - 1, this.color))
                PlayableMoves.push([row - 1, col - 1])

            return PlayableMoves
        }

    }

    moveDownwards(row, col, chessBoard) {

    }
}