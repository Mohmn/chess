import ChessDisplay  from  "./classes/ChessDisplay.js"
import Board from "./classes/ChessBoard.js"
import Player from "./classes/Player.js"
import Chess from "./classes/Chess.js"
import Queen from "./classes/Pieces/Queen.js"
import Tank from "./classes/Pieces/Tank.js"
import Bishop from "./classes/Pieces/Bishop.js"
import Knight from "./classes/Pieces/Knight.js"
import King from "./classes/Pieces/King.js"
import Pawn from "./classes/Pieces/Pawn.js"
const q = new Queen(2,7,"red",'Q')
const t = new Tank(5,5,"red","T")
const t1 = new Tank(5,2,"red","T")
const t2 = new Tank(5,2,"Black","T")
const t3 = new Tank(2,2,"Black","T")
const b = new Bishop(1,5,"Black","B")
const k = new King(6,0,"Black","King")
const board = new Board()
const Q = new Queen(6,2,"red","Q")
const kn = new Pawn(6,1,"red","P")
board.addPiece(b)
board.addPiece(k)
// board.addPiece(P1)
// board.addPiece(t3)
board.addPiece(kn)
board.addPiece(Q)
const display = new ChessDisplay(board,document)
const p1 = new Player('white')
const chess = new Chess(board,display)
const p2 = new Player('black')

display.draw()
chess.mousePressed()






