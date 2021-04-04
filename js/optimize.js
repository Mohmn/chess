import ChessBoard from "./classes/ChessBoard"

isInCheckMate(ChessBoard, player) {
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

    const orig_pos = [King.getRow(),King.getCol()] 
    function moveKing(piece,pos){
        // console.log(piece)
        
        // if the pos contains piece then remove it
        if(!ChessBoard.isFilled(pos[0],pos[1])){
            ChessBoard.board.removePiece(piece.getRow(), piece.getCol())
            ChessBoard.board.removePiece(pos[0], pos[1])
            piece.moveTo(pos[0], pos[1])
            ChessBoard.board.addPiece(piece)
        }
    }
    const king_moves = King.availableMoves()


    for(const moves in king_moves['moves']){
        ChessBoard.movePiece(king, moves)
        if(!ChessBoard.isInCheck(ChessBoard,player)){
            // unmove king
            moveKing(King,orig_pos)
            return false
        }
    }
    
    moveKing(King,orig_pos)
    return true
}