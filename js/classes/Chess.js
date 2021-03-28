import ChessBoard from "./ChessBoard.js"
import King from "./Pieces/King.js"
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


    // self invoKing function used to make movablePos as clisure var
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
            if (this.board.isFilled(pos[0], pos[1]) && player.FirstTurn()) {

                // save x,y pos selected by player on first turn
                player.savePiece([pos, e.target])
                this.display.highlightCell(e.target)

                player.numTimesClicked += 1
                pieceSelectedByPlayer = this.board.pieceAt(pos[0], pos[1])
                movablePos = pieceSelectedByPlayer.availableMoves(pos[0], pos[1], this.board)
                this.display.showPath(movablePos)

                console.log(movablePos)
            } else if (movablePos && pieceSelectedByPlayer.canMoveto(pos[0], pos[1], movablePos)) {
                // 2nd turn
                // console.log('swaping from player ' + player.color + player.pieceSelected, movablePos)
                // swap turn


                this.display.removePath(movablePos)
                this.display.unHighlightCell(player.pieceSelected[1])
                this.movePiece(pieceSelectedByPlayer, pos)

                if (pieceSelectedByPlayer.constructor.name === "Pawn") {
                    // check for pawn promotion
                    if (pieceSelectedByPlayer.canBePromoted(this.board.size)) {
                        // do something in chess disp
                        // to do write gui for pawn promotion
                    }
                }
                // console.log(movablePos,'yes',pieceSelectedByPlayer.constructor.name)
                movablePos = null
                pieceSelectedByPlayer = null
                player.numTimesClicked = 1
                this.swapTurn()
                console.log(this.isInCheck(this.board, player))

            } else {
                // means that this wasn't a validated move so undo all the things
                console.log(movablePos, 'no')
                this.display.removePath(movablePos)
                this.display.unHighlightCell(player.pieceSelected[1])
                player.numTimesClicked = 1
                movablePos = null
                pieceSelectedByPlayer = null


            }
        }

        return handling
    })()

    movePiece(piece, pos) {
        // console.log(piece)
        this.board.removePiece(piece.getRow(), piece.getCol())
        // if the pos contains piece then remove it
        this.board.removePiece(pos[0], pos[1])
        piece.moveTo(pos[0], pos[1])
        this.board.addPiece(piece)

        this.display.reDraw()
    }

    swapTurn() {
        this.whitePlayer.turn = !this.whitePlayer.turn
    }

    // isInCheck(ChessBoard board, int player)
    // if on second turn of opp can capture King
    // idea one brute force 
    // basically check if any piece can capture King
    // look for column rook,queen
    // look for diagonal bishop,queen
    // l_shape knight
    // immediate corners pawn
    // another King

    isInCheck(ChessBoard, player) {
        let King = null
        for (let i = 0; i < ChessBoard.size; i++) {
            for (let j = 0; j < ChessBoard.size; j++) {
                if (ChessBoard.isFilled(i, j)) {
                    King = ChessBoard.pieceAt(i, j)
                    if (King.constructor.name === "King") // && player.color !== King.color)
                        break
                    King = null
                }

            }
            if (King)
                break
        }

        function checkForOppPieces(row,col,piecesToCheck){

            if (!ChessBoard.opponentPlayer(row, col,player.color))
                return "stop"

            for (const piece of piecesToCheck) {
                if (ChessBoard.pieceAt(row, col).constructor.name === piece)  {
                    chessed = true
                    return
                }
            }

           
            // if non-thretining pieces come before threating pieces then return
            if(!chessed){
                return "stop"
            }

        
        }
        let chessed = false
        const topCol = [King.getRow() - 1, King.getCol()]
        let pieces = ["Tank", "Queen"]
        if (topCol[0] > 0 ) {

            for (let i = topCol[0]; i >= 0; i--) {
                if (ChessBoard.isFilled(i, topCol[1])) {
                    if ( (checkForOppPieces(i, topCol[1],pieces) === "stop") || chessed )
                        break
                }
            }
        }

        if (chessed) {
            console.log('topCOl', pieces)
            return
        }

        const lowCol = [King.getRow() + 1, King.getCol()]

        if (lowCol[0] < ChessBoard.size) {

            for (let i = topCol[0]; i < ChessBoard.size; i++) {
                if (ChessBoard.isFilled(i, lowCol[1])) {

                    if ( (checkForOppPieces(i, lowCol[1],pieces) === "stop") || chessed )
                        break
                }
            }
        }

        if (chessed) {
            console.log('lowCOl', pieces)
            return
        }

        const leftCol = [King.getRow(), King.getCol() - 1]

        if (leftCol[1] > 0) {
            for (let i = leftCol[1]; i >= 0; i--) {
                if (ChessBoard.isFilled(leftCol[0], i)) {


                if ( (checkForOppPieces(leftCol[0], i,pieces) === "stop") || chessed )
                    break
                    
                }
            }
        }

        if (chessed) {
            console.log('leftCol', pieces)
            return
        }
        const rightCol = [King.getRow(), King.getCol() + 1]

        if (rightCol[1] < ChessBoard.size) {
            for (let i = rightCol[1]; i < ChessBoard.size; i++) {
                
                if (ChessBoard.isFilled(rightCol[0], i)) {

                if ( (checkForOppPieces(rightCol[0], i,pieces) === "stop") || chessed )
                        break
                }
            }
        }

        if (chessed) {
            console.log('rightCol', pieces)
            return
        }

        const TopLeftDiag = [King.getRow()-1,King.getCol()-1]
        pieces = ["Queen","Bishop"]
        if(TopLeftDiag[0] > 0 && TopLeftDiag[1] > 0){

            // if the immediate left corner is Pawn then dont need to look out further
            if(ChessBoard.isFilled(TopLeftDiag[0],TopLeftDiag[1])){
                if( (checkForOppPieces(TopLeftDiag[0],TopLeftDiag[1],['Pawn']) === "stop")  || chessed){
                    if (chessed) {
                        console.log('TopLeftPawn', 'pawn')
                        return
                    }
                }

            }
            for (let i = TopLeftDiag[0], j = TopLeftDiag[1]; i >= 0 && j >= 0; i--, j--){
                if (ChessBoard.isFilled(i, j)) {
                   
                    if( (checkForOppPieces(i,j,pieces) === "stop")  || chessed)
                        break
                }
            }

        }
        if (chessed) {
            console.log('TopLefDIag', pieces)
            return
        }

        const lowerRightDiag = [King.getRow() + 1,King.getCol() + 1] 
        if(lowerRightDiag[0] < ChessBoard.size && lowerRightDiag[1] < ChessBoard.size){

            // if the immediate lower right corner is Pawn then dont need to look out further
            if(ChessBoard.isFilled(lowerRightDiag[0],lowerRightDiag[1])){
                if( checkForOppPieces(lowerRightDiag[0],lowerRightDiag[1],['Pawn']) || chessed){
                    if (chessed) {
                        console.log('lowerRightPawn', 'pawn')
                        return
                    }
                }

            }

            for (let i = lowerRightDiag[0], j = lowerRightDiag[1]; i < ChessBoard.size && j < ChessBoard.size; i++, j++){
                if (ChessBoard.isFilled(i, j)) {
                    if( (checkForOppPieces(i,j,pieces) === "stop")  || chessed)
                        break
                }
            }
        }
        if (chessed) {
            console.log('LowerRighDIag', pieces)
            return
        }

        const LowerLeftDiag = [King.getRow()+1,King.getCol()-1]
        if( LowerLeftDiag[0] < ChessBoard.size && LowerLeftDiag[1] > 0){

            // if the immediate lower left corner is Pawn then dont need to look out further
            if(ChessBoard.isFilled(LowerLeftDiag[0],LowerLeftDiag[1])){
                if( checkForOppPieces(LowerLeftDiag[0],LowerLeftDiag[1],['Pawn']) || chessed){
                    if (chessed) {
                        console.log('lowerLeftPawn', 'pawn')
                        return
                    }
                }

            }

            for (let i = LowerLeftDiag[0], j = LowerLeftDiag[1]; i < ChessBoard.size && j >= 0; i++, j--){
                if (ChessBoard.isFilled(i, j)) {
                    if( (checkForOppPieces(i,j,pieces) === "stop")  || chessed)
                        break
                }
            }
        }
        if (chessed) {
            console.log('LowerLeftDIag', pieces)
            return
        }
        const UpperRightDiag = [King.getRow()-1,King.getCol()+1]

        if( UpperRightDiag[0] > 0   && UpperRightDiag[1] < ChessBoard.size){

            // if the immediate lower left corner is Pawn then dont need to look out further
            if(ChessBoard.isFilled(UpperRightDiag[0],UpperRightDiag[1])){
                if( checkForOppPieces(UpperRightDiag[0],ChessBoard.size[1],['Pawn']) || chessed){
                    if (chessed) {
                        console.log('UpperRightPawn', 'pawn')
                        return
                    }
                }

            }

            for (let i = UpperRightDiag[0], j = UpperRightDiag[1]; i >=0  && j < ChessBoard.size; i--, j++){
                if (ChessBoard.isFilled(i, j)) {
                    if( (checkForOppPieces(i,j,pieces) === "stop")  || chessed)
                        break
                }
            }
        }

        if (chessed) {
            console.log('UpperRightDiag', pieces)
            return
        }


        // now for knight pieces
        let l_shape_coord = [
            [-2, +1],[-2, -1],[+2, +1],[+2, -1],[-1, +2],[-1, -2],[+1, +2],[+1, -2]
        ]

        for(let i=0;i<l_shape_coord.length;i++){
            let x = l_shape_coord[i][0] + King.getRow()
            let y = l_shape_coord[i][1] + King.getCol()
           if ( ( (x >= 0 ) && (x < ChessBoard.size) ) && ((y >= 0 ) && (y < ChessBoard.size)) ){
            if(ChessBoard.isFilled(x,y)){
                checkForOppPieces(x,y,["Knight"])
                if(chessed){
                    console.log(ChessBoard.pieceAt(x,y),"Kniight xed")
                    break
                }
            }
           }
        }

    }




















    // isInCheckMate(ChessBoard board, int player)

    // isInStalemate(ChessBoard board, int player)
}