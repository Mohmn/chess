import ChessBoard from "./ChessBoard.js"
import Player from "./Player.js"

export default class Chess {

    constructor(board, display) {
        this.board = board
        this.display = display
        this.whitePlayer = new Player('white', true)
        this.blackPlayer = new Player('black', false)
        this.DisplayBoard = this.display.domBoard
    }

    mousePressed() {


        for (let i = 0; i < this.DisplayBoard.children.length; i++) {
            for (let j = 0; j < this.DisplayBoard.children[i].children.length; j++) {

                this.DisplayBoard.children[i].children[j].addEventListener('click',
                    () => this.handleClick([i, j], event))
            }
        }
    }


    // self invoking function used to make movablePos as clisure var
    handleClick = (function () {

        let player
        let movablePos = null
        let pieceSelectedByPlayer = null

        function handling(pos, e) {

            if (this.whitePlayer.turn) {
                player = this.whitePlayer
            } else {
                player = this.blackPlayer
            }
            // if the board is filled with some piece
            if (this.board.isFilled(pos[0], pos[1]) && player.FirstTurn() ) {

                // save x,y pos selected by player on first turn
                player.savePiece([pos, e.target])
                this.display.highlightCell(e.target)

                player.numTimesClicked += 1
                pieceSelectedByPlayer = this.board.pieceAt(pos[0], pos[1])
                movablePos = pieceSelectedByPlayer.availableMoves(pos[0], pos[1], this.board)
                this.display.showPath(movablePos)
                
                console.log(movablePos)
            } 
            else if( movablePos && pieceSelectedByPlayer.canMoveto(pos[0],pos[1],movablePos)) {
                // 2nd turn
                // console.log('swaping from player ' + player.color + player.pieceSelected, movablePos)
                // swap turn
                

                this.display.removePath(movablePos)
                this.display.unHighlightCell(player.pieceSelected[1])
                this.movePiece(pieceSelectedByPlayer,pos)

                if(pieceSelectedByPlayer.constructor.name === "Pawn"){
                    // check for pawn promotion
                    if(pieceSelectedByPlayer.canBePromoted(this.board.size)){
                        // do something in chess disp
                        // to do write gui for pawn promotion
                    }
                }
                // console.log(movablePos,'yes',pieceSelectedByPlayer.constructor.name)
                movablePos = null
                pieceSelectedByPlayer = null
                player.numTimesClicked = 1
                this.swapTurn()


            }else{
                // means that this wasn't a validated move so undo all the thinfs
                console.log(movablePos,'no')
                this.display.removePath(movablePos)
                this.display.unHighlightCell(player.pieceSelected[1])
                player.numTimesClicked = 1
                movablePos = null
                pieceSelectedByPlayer = null
            

            }
        }

        return handling
    })()


    movePiece(piece,pos){
        // console.log(piece)
        this.board.removePiece(piece.getRow(),piece.getCol())
        // if the pos contains piece then remove it
        this.board.removePiece(pos[0],pos[1])
        piece.moveTo(pos[0],pos[1])
        this.board.addPiece(piece)

        this.display.reDraw()
    }
    
    swapTurn() {
        this.whitePlayer.turn = !this.whitePlayer.turn
    }

















    //     isInCheckMate(ChessBoard board, int player)
    // isInCheck(ChessBoard board, int player)
    // isInStalemate(ChessBoard board, int player)
}