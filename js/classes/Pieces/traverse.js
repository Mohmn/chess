function traverse_rows(row, col, chessBoard, color) {
    // color used here if the color of the piece is opp then add it to arrays
    let left_row = []

    for (let i = col - 1; i >= 0; i--) {

        if (!chessBoard.board[row][i])
            left_row.push([row, i])
        else {
            if (chessBoard.board[row][i].color !== color)
                left_row.push([row, i])
            break
        }
    }

    let right_row = []

    for (let i = col + 1; i < chessBoard.size; i++) {

        if (!chessBoard.board[row][i])
            right_row.push([row, i])
        else {
            if (chessBoard.board[row][i].color !== color)
                right_row.push([row, i])
            break
        }
    }

    return [left_row, right_row]
}


function traverse_cols(row, col, chessBoard, color) {

    let left_col = []

    for (let i = row - 1; i >= 0; i--) {

        if (!chessBoard.board[i][col]) // if the boadPos is null
            left_col.push([i, col])
        else {
            if (chessBoard.board[i][col].color !== color) //if the boardpos has piece of opp color 
                left_col.push([i, col]) // then the piece can cat it
            break
        }

    }

    let right_col = []

    for (let i = row + 1; i < chessBoard.size; i++) {

        if (!chessBoard.board[i][col])
            right_col.push([i, col])
        else {
            if (chessBoard.board[i][col].color !== color)
                right_col.push([i, col])
            break
        }
    }

    return [left_col, right_col]
}


function traverse_diagonals(row, col, chessBoard, color) {

    let leftUpperDiag = []
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {

        if (!chessBoard.board[i][j])
            leftUpperDiag.push([i, j])
        else {
            if (chessBoard.board[i][j].color !== color)
                leftUpperDiag.push([i, j])
            break
        }
    }

    let rightLowerDiag = []

    for (let i = row + 1, j = col + 1; i < chessBoard.size && j < chessBoard.size; i++, j++) {

        if (!chessBoard.board[i][j])
            rightLowerDiag.push([i, j])
        else {
            if (chessBoard.board[i][j].color !== color)
                rightLowerDiag.push([i, j])
            break
        }
    }

    let leftLowerDiag = []
    for (let i = row + 1, j = col - 1; i < chessBoard.size && j >= 0; i++, j--) {

        if (!chessBoard.board[i][j])
            leftLowerDiag.push([i, j])
        else {
            if (chessBoard.board[i][j].color !== color)
                leftLowerDiag.push([i, j])
            break
        }
    }

    let rightUpperDiag = []
    let i = row - 1
    let  j = col + 1
    console.log(row -1, col + 1, i,j,chessBoard.size,chessBoard.board[i][j], 'rud')
    for (let i = row - 1, j = col + 1; i >= 0 && j < chessBoard.size; i--, j++) {
        console.log(i,j, 'rud')
        if (!chessBoard.board[i][j])
            rightUpperDiag.push([i, j])
        else {
            if (chessBoard.board[i][j].color !== color)
                rightUpperDiag.push([i, j])
            break
        }
    }

    console.log(leftUpperDiag, rightLowerDiag, leftLowerDiag, rightUpperDiag)
    return [leftUpperDiag, rightLowerDiag, leftLowerDiag, rightUpperDiag]
}
export {
    traverse_rows,
    traverse_cols,
    traverse_diagonals
}