export default class ChessDisplay {


    constructor(board, document) {
        this.ChessBoard = board
        this.Document = document

    }

    even(number) {
        return (number % 2) == 0
    }

    draw() {

        const Board = this.Document.getElementById('board')

        for (let i = 0; i < this.ChessBoard.size; i++) {
            const row = this.Document.createElement('div')
            row.className = "row"

            for (let j = 0; j < this.ChessBoard.size; j++) {

                const cell = this.Document.createElement('div')

                if (this.even(j + i))
                    cell.className = "black-cell cells"
                else
                    cell.className = "white-cell cells"

                if(this.ChessBoard.board[i][j]){

                    
                   const p = this.ChessBoard.pieceAt(i,j)
                    cell.innerText = p.representation
                    cell.style.color = p.color
                }

                row.appendChild(cell)
            }

            Board.appendChild(row)
        }

    }


    highlightCell(cell){
        cell.classList.add('highlight-cell')
    }

    unHighlightCell(cell){
        cell.classList.remove('highlight-cell')
    }

}