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

    // canMoveTo[row, col, chessBoard) {

    // }


    canMoveto(row, col, movableMoves) {
      
        for(const arr of movableMoves['moves'][0]){
            if( (arr[0] === row ) && (arr[1] === col) )
                return true
        }

        return false
    }
    // the direction argument is used to check if the player moves upwards or downwards
    // -1 direction for upwards movement, +1 direction for downwards movement

    availableMoves(row, col, chessBoard) {

        let moves  = []
        if (this.moveUp)
            moves = [this.movement(row, col, chessBoard, -1)]
        else
            moves = [this.movement(row, col, chessBoard, 1)]
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

    //    if col is in range[1,chessboard.size-1] then the pawn can capture two pieces
    //    which are at the diagonal position to it

    // if the col is == 0 then pawn can move forward and capture piece which is positioned
    // at the right coner of it

    // if the above two conditions fail 
    // then pawn can move forward and capture piece which is positioned at the left corner of it

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