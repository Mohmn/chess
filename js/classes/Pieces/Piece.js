export default class Piece{

    constructor(row,col,color){
        this.row = row
        this.col = col
        this.color = color
    }

    getRow(){
        return this.row
    }

    getCol(){
        return this.col
    }

    moveTo(row,col){
        this.row = row
        this.col = col
    }

    moveWouldCauseCheck(finalRow,finalCol,chessBoard,isInCheck){
    

        const opp_piece = chessBoard.pieceAt(finalRow,finalCol)

        const orig_pos = [this.getRow(),this.getCol()]
        chessBoard.removePiece(this.getRow(),this.getCol())
        this.moveTo(finalRow,finalCol)
        chessBoard.addPiece(this)

        // updating it here because king may move and we need to update its location 
        if(this.constructor.name === "King"){
            chessBoard.updateKingLoc(this)
        }

        const check = isInCheck(chessBoard,this.color,"own")

        chessBoard.removePiece(this.getRow(),this.getCol())
        this.moveTo(orig_pos[0],orig_pos[1])
        chessBoard.addPiece(this)

        if(opp_piece){
            chessBoard.addPiece(opp_piece)
        }

        if(this.constructor.name === "King"){
            chessBoard.updateKingLoc(this)
        }
        // console.log(check,"movewoukdcausecheck")
        return check
  }

}