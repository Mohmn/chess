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

        let moves = [this.moveUpwards(row, col, chessBoard,1)]
        console.log(moves)
        const movable = {

            moves: moves
        }
        return movable

    }

    makeFirstmove(row, col, chessBoard, direction) {
        let PlayableMoves = []
        if (!chessBoard.isFilled(row + direction, col))
            PlayableMoves.push([row + direction, col])
        if (!chessBoard.isFilled(row + (2 * direction), col))
            PlayableMoves.push([row + (2 * direction), col])

        this.firstMove = false

        return PlayableMoves
    }

    canCaptureLeftDiagonal(row, col, chessBoard, direction) {
        return ( chessBoard.isFilled(row + direction, col + direction) && chessBoard.opponentPlayer(row + direction, col + direction, this.color))
    }

    canCaptureRightDiagonal(row, col, chessBoard, direction) {
        return (chessBoard.isFilled(row + direction, col + (-1*direction)) && chessBoard.opponentPlayer(row + direction, col + (-1*direction), this.color))
    }
    moveUpwards(row, col, chessBoard,direction) {
        let PlayableMoves = []
        if ((col > 0) && col < (chessBoard.size - 1)) {

            if (this.firstMove)
                PlayableMoves = this.makeFirstmove(row, col, chessBoard, direction)
            else {

                if (!chessBoard.isFilled(row + direction, col))
                    PlayableMoves.push([row + direction, col])
            }

            if (this.canCaptureLeftDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + direction])
            if (this.canCaptureRightDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + (-1*direction)])

            return PlayableMoves
        } else if (col === 0) {
            if (this.firstMove)
                PlayableMoves = this.makeFirstmove(row, col, chessBoard, direction)
            else {

                if (!chessBoard.isFilled(row + direction, col))
                    PlayableMoves.push([row + direction, col])
            }
            if (this.canCaptureRightDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + (-1*direction)])

            return PlayableMoves
        } else {

            if (this.firstMove)
                PlayableMoves = this.makeFirstmove(row, col, chessBoard, direction)
            else {
                if (!chessBoard.isFilled(row + direction, col))
                    PlayableMoves.push([row + direction, col])
            }

            if (this.canCaptureLeftDiagonal(row, col, chessBoard, direction))
                PlayableMoves.push([row + direction, col + direction])

            return PlayableMoves
        }

    }
    }