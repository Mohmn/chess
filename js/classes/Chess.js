import Player from "./Player.js"

export default class Chess {

    constructor(board,display){
        this.board = board
        this.display = display
        this.whitePlayer = new Player('white',true)
        this.blackPlayer = new Player('black',false)
        this.DisplayBoard = this.display.Document.getElementById('board')
    }

    mousePressed() {
 

            for(let i=0;i<this.DisplayBoard.children.length;i++){
                for(let j=0;j<this.DisplayBoard.children[i].children.length;j++){

                    // board.children[i].children[j].addEventListener('click',()=>this.handleClick())
                
                    this.DisplayBoard.children[i].children[j].addEventListener('click',()=>this.handleClick([i,j],event))
                }
            }
    }


handleClick(pos,e){
    
    let player

    if(this.whitePlayer.turn){
        player = this.whitePlayer
    }else{
        player = this.blackPlayer
    }
    if(player.FirstTurn()){
        player.savePiece([pos,e.target])
        player.numTimesClicked += 1
        this.display.highlightCell(e.target)
    }else{
        console.log('swaping from player ' + player.color + player.pieceSelected)
        // swap turn
        this.display.unHighlightCell(player.pieceSelected[1])
        player.numTimesClicked = 1
        this.swapTurn()
    }
    
}



swapTurn(){
    this.whitePlayer.turn = !this.whitePlayer.turn
}

















//     isInCheckMate(ChessBoard board, int player)
// isInCheck(ChessBoard board, int player)
// isInStalemate(ChessBoard board, int player)
}