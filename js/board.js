import ChessDisplay  from  "./classes/ChessDisplay.js"
import Board from "./classes/ChessBoard.js"
import Player from "./classes/Player.js"
import Chess from "./classes/Chess.js"
import Queen from "./classes/Pieces/Queen.js"

const q = new Queen(7,0,"red",'Q')
const board = new Board()
board.addPiece(q)
const display = new ChessDisplay(board,document)
const p1 = new Player('white')
const chess = new Chess(board,display)
const p2 = new Player('black')
let p = undefined
// let s = true
// while(s){
    display.draw()
//         // console.log(board.board)
//     if(p1.turns < 2)
//         p = p1
//     else
//         p = p2
    chess.mousePressed()

// //     if(p1.turns < 2){
// //         console.log('<2')
// //     }else{
// //         console.log('done')
// //         s=false
// //     }
// // }





