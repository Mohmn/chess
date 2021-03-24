import ChessDisplay  from  "./classes/ChessDisplay.js"
import Board from "./classes/ChessBoard.js"
import Player from "./classes/Player.js"
import Chess from "./classes/Chess.js"
import Queen from "./classes/Pieces/Queen.js"
import Tank from "./classes/Pieces/Tank.js"
import Bishop from "./classes/Pieces/Bishop.js"
const q = new Queen(2,7,"red",'Q')
const t = new Tank(5,5,"red","T")
const t1 = new Tank(5,2,"red","T")
const t2 = new Tank(4,2,"red","T")
const t3 = new Tank(2,2,"Black","T")
const b = new Bishop(4,4,"red","B")
const board = new Board()
board.addPiece(b)
board.addPiece(t1)
board.addPiece(t2)
board.addPiece(t3)
board.addPiece(q)
const display = new ChessDisplay(board,document)
const p1 = new Player('white')
const chess = new Chess(board,display)
const p2 = new Player('black')

display.draw()
chess.mousePressed()






