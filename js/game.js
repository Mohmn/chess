import ChessDisplay from "./classes/ChessDisplay.js"
import Board from "./classes/ChessBoard.js"
import Player from "./classes/Player.js"
import Chess from "./classes/Chess.js"
import Tank from "./classes/Pieces/Tank.js"

const board = new Board('Black', 'Red')

// const T= new Tank(6,2,"RED","TNK")
// board.addPiece(T)
const display = new ChessDisplay(board, document)
const chess = new Chess(board, display)

display.draw()
chess.mousePressed()

console.log(chess.status, 'yo playinn')






