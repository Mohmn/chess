// import ChessBoard from "./ChessBoard.js"
// import King from "./Pieces/King.js"
import Player from "./Player.js"

export default class Chess {

    constructor(board, display) {
        this.board = board
        this.display = display
        this.whitePlayer = new Player("Red", true)
        this.blackPlayer = new Player("Black", false)
        this.DisplayBoard = this.display.domBoard
        this.status = false
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


        function resetPlayer(obj) {
            movablePos = null
            pieceSelectedByPlayer = null
            player.numTimesClicked = 1
            obj.swapTurn()
        }

        function handling(pos, e) {
            
            if (this.whitePlayer.turn) {
                player = this.whitePlayer
            } else {
                player = this.blackPlayer
            }


            // if the board is filled with some piece
            console.log(player)
            if (this.board.isFilled(pos[0], pos[1]) && player.FirstTurn()) {

                //    if it is white players turn olayer cannot click on black players pieces and vice versa
                if (this.board.pieceAt(pos[0], pos[1]).color !== player.color)
                    return

                // save x,y pos selected by player on first turn
                player.savePiece([pos, e.target])
                this.display.highlightCell(e.target)

                player.numTimesClicked += 1
                pieceSelectedByPlayer = this.board.pieceAt(pos[0], pos[1])
                movablePos = pieceSelectedByPlayer.availableMoves(this.board,this.isInCheck)
                this.display.showPath(movablePos)

                console.log(movablePos)
            } else if (movablePos && pieceSelectedByPlayer.canMoveto(pos[0], pos[1], movablePos)) {
                // 2nd turn
                // console.log('swaping from player ' + player.color + player.pieceSelected, movablePos)
                // swap turn


                this.display.removePath(movablePos)
                this.display.unHighlightCell(player.pieceSelected[1])
                this.movePiece(pieceSelectedByPlayer, pos)
                this.display.reDraw()

                if (pieceSelectedByPlayer.constructor.name === "Pawn") {
                    // check for pawn promotion
                    if (pieceSelectedByPlayer.canBePromoted(this.board.size)) {
                        // do something in chess disp
                        // to do write gui for pawn promotion
                    }
                }else if(pieceSelectedByPlayer.constructor.name === "King"){
                   this.board.updateKingLoc(pieceSelectedByPlayer)
                }
                // console.log(movablePos,'yes',pieceSelectedByPlayer.constructor.name)

                if (this.isInCheck(this.board, player.color)) {
                    console.log("Chess in king")
                    if (this.isInCheckMate(this.board, player)) {
                        console.log('chessmate')
                        this.status = true
                    }
                } else if (this.isInStalemate(this.board, player)) {
                    console.log('stalemate')
                    this.status = true
                }

                resetPlayer(this)


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

    isInCheck(ChessBoard, playersColor,king_to_see="opposite") {
        // how can i make it o(1)
        // it's o(n^2)
        // can store kings location as a property of chessBoard
        let King = null
        // for (let i = 0; i < ChessBoard.size; i++) {
        //     for (let j = 0; j < ChessBoard.size; j++) {
        //         if (ChessBoard.isFilled(i, j)) {
        //             King = ChessBoard.pieceAt(i, j)
        //             if ((King.constructor.name === "King") && (player.color !== King.color))
        //                 break
        //             King = null
        //         }

        //     }

        //     if (King) {
        //         console.log(King.color, "ccccccccccccccccccccccccc")
        //         break
        //     }
        // }
        // king_to_see used here because in movewouldcausecheck method i have to look for my own king
        // and in the checkmate or stalemate method io have to opp king
        if(king_to_see === "own"){
            if(ChessBoard.king1.color === playersColor)
                King = ChessBoard.pieceAt(ChessBoard.king1.location[0],ChessBoard.king1.location[1])
            else
                King = ChessBoard.pieceAt(ChessBoard.king2.location[0],ChessBoard.king2.location[1])
        }else{
            if(ChessBoard.king1.color !== playersColor)
            King = ChessBoard.pieceAt(ChessBoard.king1.location[0],ChessBoard.king1.location[1])
        else
            King = ChessBoard.pieceAt(ChessBoard.king2.location[0],ChessBoard.king2.location[1])
        }

        console.log(King,'kinggggg')
        // fuction to make iterator can loop both forwards as well as backwards
        function* range(start, end, leap) {
            if (leap > 0) {
                for (let i = start; i < end; i += leap)
                    yield i
            } else {
                for (let i = start; i > end; i += leap)
                    yield i
            }
        }

        function checkForRowsColumns(arg1, arg2) {

            let iterator, index1, index2, pos
            // here figuring which argumet is of type iterator
            // beacuse i might had to iterate over row or over column
            if (typeof (arg1) === "object") {
                iterator = arg1
                index1 = 0, index2 = 1
                pos = arg2
            } else {
                iterator = arg2
                pos = arg1
                index1 = 1, index2 = 0
            }

            for (let i of iterator) {

                let arr = [0, 0]

                arr[index1] = i
                arr[index2] = pos

                if (ChessBoard.isFilled(arr[0], arr[1])) {
                    if ((checkForOppPieces(arr[0], arr[1], pieces) === "stop") || chessed)
                        break

                }

            }

        }


        function checkForOppPieces(row, col, piecesToCheck) {

            if (!ChessBoard.opponentPlayer(row, col, King.color))
                return "stop"

            for (const piece of piecesToCheck) {
                if (ChessBoard.pieceAt(row, col).constructor.name === piece) {
                    chessed = true
                    return
                }
            }

            // if non-thretening pieces come before threating pieces then return
            if (!chessed)
                return "stop"

        }


        let chessed = false
        const topCol = [King.getRow() - 1, King.getCol()]
        let pieces = ["Tank", "Queen"]
        if (topCol[0] >= 0)
            checkForRowsColumns(range(topCol[0], -1, -1), topCol[1])
        if (chessed) {
            console.log('topCOl', pieces)
            return true
        }

        const lowCol = [King.getRow() + 1, King.getCol()]

        if (lowCol[0] < ChessBoard.size)
            checkForRowsColumns(range(lowCol[0], ChessBoard.size, 1), lowCol[1])
        if (chessed) {
            console.log('lowCOl', pieces)
            return true
        }

        const leftCol = [King.getRow(), King.getCol() - 1]

        if (leftCol[1] >= 0)
            checkForRowsColumns(leftCol[0], range(leftCol[1], -1, -1))
        if (chessed) {
            console.log('leftCol', pieces)
            return true
        }

        const rightCol = [King.getRow(), King.getCol() + 1]
        if (rightCol[1] < ChessBoard.size)
            checkForRowsColumns(rightCol[0], range(rightCol[1], ChessBoard.size, 1))
        if (chessed) {
            console.log('rightCol', pieces)
            return true
        }

        function checkFordiagonals(arr1, arr2) {

            let i = 0,
                j = 0,
                done = true

            while (done) {

                if (ChessBoard.isFilled(arr1[i], arr2[j])) {
                    if ((checkForOppPieces(arr1[i], arr2[j], pieces) === "stop") || chessed)
                        break
                }
                i++, j++
                done = (i < arr1.length) && (j < arr2.length)
            }

        }

        pieces = ["Queen", "Bishop"]

        const TopLeftDiag = [King.getRow() - 1, King.getCol() - 1]
        if (TopLeftDiag[0] > 0 && TopLeftDiag[1] > 0) {

            const arr1 = Array.from(range(TopLeftDiag[0], -1, -1))
            const arr2 = Array.from(range(TopLeftDiag[1], -1, -1))
            checkFordiagonals(arr1, arr2)

        }
        if (chessed) {
            console.log('TopLefDIag', pieces)
            return true
        }

        const lowerRightDiag = [King.getRow() + 1, King.getCol() + 1]
        if (lowerRightDiag[0] < ChessBoard.size && lowerRightDiag[1] < ChessBoard.size) {

            const arr1 = Array.from(range(lowerRightDiag[0], ChessBoard.size, 1))
            const arr2 = Array.from(range(lowerRightDiag[1], ChessBoard.size, 1))
            checkFordiagonals(arr1, arr2)
        }
        if (chessed) {
            console.log('LowerRighDIag', pieces)
            return true
        }

        const LowerLeftDiag = [King.getRow() + 1, King.getCol() - 1]
        if (LowerLeftDiag[0] < ChessBoard.size && LowerLeftDiag[1] > 0) {

            const arr1 = Array.from(range(LowerLeftDiag[0], ChessBoard.size, 1))
            const arr2 = Array.from(range(LowerLeftDiag[1], -1, -1))
            checkFordiagonals(arr1, arr2)

        }
        if (chessed) {
            console.log('LowerLeftDIag', pieces)
            return true
        }
        const UpperRightDiag = [King.getRow() - 1, King.getCol() + 1]

        if (UpperRightDiag[0] > 0 && UpperRightDiag[1] < ChessBoard.size) {

            const arr1 = Array.from(range(UpperRightDiag[0], -1, -1))
            const arr2 = Array.from(range(UpperRightDiag[1], ChessBoard.size, 1))
            checkFordiagonals(arr1, arr2)
        }

        if (chessed) {
            console.log('UpperRightDiag', pieces)
            return true
        }

        //pawns 
        // pawns  moving down
        // upper corners
        const row = King.getRow(),
            col = King.getCol()
        let upperCornerPawns = []
        if (row > 0) {
            if (col > 0)
                upperCornerPawns.push([row - 1, col - 1]) //leftuppercorner
            if (col < ChessBoard.size)
                upperCornerPawns.push([row - 1, col + 1]) //rightuppercorner

            for (const piece of upperCornerPawns) {
                if (ChessBoard.isFilled(piece[0], piece[1]) && ChessBoard.pieceAt(piece[0], piece[1]).constructor.name === "Pawn") {
                    // upper pawn can only eat if they move down and are opposite
                    const pawn = ChessBoard.pieceAt(piece[0], piece[1])
                    if (!pawn.moveUp && ChessBoard.opponentPlayer(piece[0], piece[1], King.color)) {
                        console.log("lowermovingPawns", piece)
                        return true
                    }

                }
            }
        }


        // pawnns moving up 
        // lower cornerns
        let lowerCornerPawns = []
        if (row < ChessBoard.size - 1) {
            if (col > 0)
                lowerCornerPawns.push([row + 1, col - 1]) //leftlowercorner
            if (col < ChessBoard.size)
                lowerCornerPawns.push([row + 1, col + 1]) //leftlowercorner

            for (const piece of lowerCornerPawns) {
                if (ChessBoard.isFilled(piece[0], piece[1]) && ChessBoard.pieceAt(piece[0], piece[1]).constructor.name === "Pawn") {
                    // upper pawn can only eat if they move down and are opposite
                    const pawn = ChessBoard.pieceAt(piece[0], piece[1])
                    console.log(pawn.moveUp && ChessBoard.opponentPlayer(piece[0], piece[1], King.color))
                    if (pawn.moveUp && ChessBoard.opponentPlayer(piece[0], piece[1], King.color)) {
                        console.log("uppermovingPawns", piece)
                        return true
                    }

                }
            }
        }
        // now for knight pieces
        let l_shape_coord = [
            [-2, +1],
            [-2, -1],
            [+2, +1],
            [+2, -1],
            [-1, +2],
            [-1, -2],
            [+1, +2],
            [+1, -2]
        ]

        for (let i = 0; i < l_shape_coord.length; i++) {
            let x = l_shape_coord[i][0] + King.getRow()
            let y = l_shape_coord[i][1] + King.getCol()
            if (((x >= 0) && (x < ChessBoard.size)) && ((y >= 0) && (y < ChessBoard.size))) {
                if (ChessBoard.isFilled(x, y)) {
                    checkForOppPieces(x, y, ["Knight"])
                    if (chessed) {
                        console.log(ChessBoard.pieceAt(x, y), "Kniight xed")
                        return true
                    }
                }
            }
        }

        // now the peice left is oppking

        return false

    }

    // look for every piece and watch for every opp piece 
    // if any piece cancels out check then its not a check mate 
    // otherwise its a check mate
    isInCheckMate(ChessBoard=this.board, player) {
        // if any piece has any legal move left that would remove the king from check
        const pieces = []

        for (let i = 0; i < ChessBoard.size; i++) {
            for (let j = 0; j < ChessBoard.size; j++) {
                if (ChessBoard.isFilled(i, j) && (ChessBoard.pieceAt(i, j).color !== player.color)) {
                    const piece = ChessBoard.pieceAt(i, j)
                    // console.log(piece.constructor.name,piece.color)
                    if (piece_can_counter_check(piece,this)) {
                        return false
                    }
                }
            }
        }

        return true


        function piece_can_counter_check(piece,obj) {

            const moves = piece.availableMoves(ChessBoard,obj.isInCheck)
            let opp_piece = null
            const piece_pos = [piece.getRow(), piece.getCol()]

            for (const pos of map_to_individual_move(moves)) {
                
                if(ChessBoard.isFilled(pos[0],pos[1])){
                    // mark the pos of opp piece
                    opp_piece = ChessBoard.pieceAt(pos[0],pos[1])
                    obj.movePiece(piece,pos)


                }else{
                    obj.movePiece(piece,pos)
                }

                if(piece.constructor.name === "King"){
                    ChessBoard.updateKingLoc(piece)
                }
                    
                // if we move the player to that pos and that cancels out check
                // then its not a checkmate 
                if(!obj.isInCheck(ChessBoard,player)){

                    // move piece back to its original pos
                    obj.movePiece(piece,piece_pos)

                    // if we displaced any piece then move back it to its original pos
                    if(opp_piece){
                        ChessBoard.addPiece(opp_piece)
                        opp_piece = null
                    }

                    if(piece.constructor.name === "king"){
                        ChessBoard.updateKingLoc(piece)
                    }

                    return true
                }

                // move piece back to its original pos
                obj.movePiece(piece,piece_pos)

                // if we displaced any piece then move back it to its original pos
                if(opp_piece){
                    ChessBoard.addPiece(opp_piece)
                    opp_piece = null
                }

                if(piece.constructor.name === "king"){
                    ChessBoard.updateKingLoc(piece)
                }

            }


            return false
        }

        function* map_to_individual_move(pieces) {
        
            for (const direc in pieces) {

                for (const arr of pieces[direc]) {
                   
                    for (const move of arr)
                    
                        yield move
                }

            }
        }



    }

    // stalemate is same as check mate 
    // stalemate occurs when a player is currently not in check, but any legal move left available would
    // result in him/her moving into check
    // better to return checkmate function

    isInStalemate(board, player) {
        return this.isInCheckMate(board, player)
    }

}