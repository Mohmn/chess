export default class ChessDisplay {

    constructor(board, document) {
        this.ChessBoard = board
        this.Document = document
        this.domBoard = document.getElementById('board')
    }

    even(number) {
        return (number % 2) == 0
    }

    draw() {

        for (let i = 0; i < this.ChessBoard.size; i++) {
            const row = this.Document.createElement('div')
            row.className = "row"

            for (let j = 0; j < this.ChessBoard.size; j++) {

                const cell = this.Document.createElement('div')

                if (this.even(j + i))
                    cell.className = "black-cell cells"
                else
                    cell.className = "white-cell cells"

                if (this.ChessBoard.board[i][j]) {


                    const p = this.ChessBoard.pieceAt(i, j)
                    cell.innerText = p.representation
                    cell.style.color = p.color
                }

                row.appendChild(cell)
            }

            this.domBoard.appendChild(row)
        }

    }

    reDraw() {

        for (let i = 0; i < this.domBoard.children.length; i++) {

            for (let j = 0; j < this.domBoard.children[i].children.length; j++) {

                if (this.ChessBoard.board[i][j]) {
                    const p = this.ChessBoard.pieceAt(i, j)
                    this.domBoard.children[i].children[j].innerText = p.representation
                    this.domBoard.children[i].children[j].style.color = p.color
                } else {
                    this.domBoard.children[i].children[j].innerText = null
                }
            }

        }


    }

    getCell(row, col) {
        return this.domBoard.children[row].children[col]
    }

    visulaizeCell(cell) {
        const elem = document.createElement('div')
        elem.classList.add('dot')
        cell.appendChild(elem)
    }

    unvisulaizeCell(cell) {
        const child = cell.children[0]
        cell.removeChild(child)
    }
    highlightCell(cell) {
        cell.classList.add('highlight-cell')
    }

    unHighlightCell(cell) {
        cell.classList.remove('highlight-cell')
    }
    // obj of array of arrays locations
    showPath(locations) {
        for (const loc in locations) {

            locations[loc].map((pos) => pos.map((p) => {
                const cell = this.getCell(p[0], p[1])
                this.visulaizeCell(cell)
            }))
        }
    }

    removePath(locations) {
        for (const loc in locations) {
            locations[loc].map((pos) => pos.map((p) => {

                const cell = this.getCell(p[0], p[1])
                this.unvisulaizeCell(cell)
            }))
        }
    }


    quit(player, action, func) {
        let king = this.ChessBoard.king1.color === player.color ? this.ChessBoard.king2 :
            this.ChessBoard.king1
        king = this.ChessBoard.pieceAt(...king.location)
        const cell = this.getCell(king.getRow(), king.getCol())

        if (action === 'checkmate') {
            cell.classList.add('checkmate')
            this.removeEventListeners(func)
            this.Document.getElementById('result').innerText = `Game Over, Team ${king.color} lost`
            return
        }

        if (action === 'stalemate') {
            cell.classList.add('stalemate')
        }
    }

    removeEventListeners(func) {
        for (let i = 0; i < this.domBoard.children.length; i++) {
            for (let j = 0; j < this.domBoard.children[i].children.length; j++) {
                this.domBoard.children[i].children[j].removeEventListener('click', func[[i, j]])
            }
        }
    }

}