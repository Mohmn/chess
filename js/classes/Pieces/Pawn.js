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

    // the direction argument is used to check if the player moves upwards or downwards
    // -1 direction for upwards movement, +1 direction for downwards movement

    availableMoves(row, col, chessBoard) {

        let moves = [this.movement(row, col, chessBoard, 1)]
        console.log(moves)
        const movable = {

            moves: moves
        }
        return movable

    }


    // this methods checks for pawns first move
    makeFirstmove(row, col, chessBoard, direction) {
        let PlayableMoves = []
        if (!chessBoard.isFilled(row + direction, col))
            PlayableMoves.push([row + direction, col])
        if (!chessBoard.isFilled(row + (2 * direction), col))
            PlayableMoves.push([row + (2 * direction), col])

        this.firstMove = false

        return PlayableMoves
    }

    // if the pawn can capture the piece which is at the left corner side of it
    canCaptureLeftDiagonal(row, col, chessBoard, direction) {
        return (chessBoard.isFilled(row + direction, col + direction) && chessBoard.opponentPlayer(row + direction, col + direction, this.color))
    }
    // if the pawn can capture the piece which is at the right corner side of it
    canCaptureRightDiagonal(row, col, chessBoard, direction) {
        return (chessBoard.isFilled(row + direction, col + (-1 * direction)) && chessBoard.opponentPlayer(row + direction, col + (-1 * direction), this.color))
    }


    movement(row, col, chessBoard, direction) {

       
        if ((col > 0) && col < (chessBoard.size - 1))
            return this.specifiedMovement(row, col, chessBoard, direction, "both")
        else if (col === 0)
            return this.specifiedMovement(row, col, chessBoard, direction, "right")
        else
            return this.specifiedMovement(row, col, chessBoard, direction, "left")
    }


    specifiedMovement(row, col, chessBoard, direction, diagonal) {

        let PlayableMoves = []

        if (this.firstMove)
            PlayableMoves = this.makeFirstmove(row, col, chessBoard, direction)
        else {

            if (!chessBoard.isFilled(row + direction, col))
                PlayableMoves.push([row + direction, col])
        }
        if (diagonal === "both") {

            if (this.canCaptureLeftDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + direction])
            if (this.canCaptureRightDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + (-1 * direction)])

        } else if (diagonal === "left") {

            if (this.canCaptureLeftDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + direction])

        } else {

            if (this.canCaptureRightDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + (-1 * direction)])
                
        }
        return PlayableMoves
    }
}