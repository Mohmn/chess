import Player from "./Player.js"

export default class Chess {

    constructor(board,display){
        this.board = board
        this.display = display
        this.whitePlayer = new Player('white',true)
        this.blackPlayer = new Player('black',false)
        this.DisplayBoard = this.display.domBoard
    }

    mousePressed() {
 

            for(let i=0;i<this.DisplayBoard.children.length;i++){
                for(let j=0;j<this.DisplayBoard.children[i].children.length;j++){
                
                    this.DisplayBoard.children[i].children[j].addEventListener('click',
                            ()=>this.handleClick([i,j],event))
                }
            }
    }


    // self invoking function used to make movablePos as clisure var
handleClick = (function(){
    
    let player
    let movablePos = null
    let i=0;
    
        function handling(pos,e){
            i+=1
            console.log(i)
            if(this.whitePlayer.turn){
                player = this.whitePlayer
            }else{
                player = this.blackPlayer
            }
            if(player.FirstTurn()){

                player.savePiece([pos,e.target])
                player.numTimesClicked += 1
                this.display.highlightCell(e.target)

                if (this.board.isFilled(pos[0],pos[1])){
                    const p = this.board.pieceAt(pos[0],pos[1])
                    movablePos = p.availableMoves(pos[0],pos[1], this.board.board)
                    this.display.showPath(movablePos)
                }
            }else{
                console.log('swaping from player ' + player.color + player.pieceSelected,movablePos)
                // swap turn
                this.display.unHighlightCell(player.pieceSelected[1])
                if(movablePos){
                    console.log("DDD",movablePos)
                    this.display.removePath(movablePos)
                    movablePos = null
                }
                player.numTimesClicked = 1
                this.swapTurn()
            }
        }

    return handling
})()



swapTurn(){
    this.whitePlayer.turn = !this.whitePlayer.turn
}

















//     isInCheckMate(ChessBoard board, int player)
// isInCheck(ChessBoard board, int player)
// isInStalemate(ChessBoard board, int player)
}