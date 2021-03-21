
export default class Player {

    pieceSelected = null

    constructor(color,turn) {
        this.color = color   
        this.numTimesClicked= 1
        this.turn = turn
    }

    savePiece(Piece){

        this.pieceSelected = Piece

    }

    removePiece(){
        this.pieceSelected = null
    }

    FirstTurn(){
        return this.numTimesClicked == 1
    }

}