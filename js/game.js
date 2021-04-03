import ChessDisplay  from  "./classes/ChessDisplay.js"
import Board from "./classes/ChessBoard.js"
import Player from "./classes/Player.js"
import Chess from "./classes/Chess.js"


const board = new Board()


const display = new ChessDisplay(board,document)
const p1 = new Player('white')
const chess = new Chess(board,display)
const p2 = new Player('black')

display.draw()
chess.mousePressed()






