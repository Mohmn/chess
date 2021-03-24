function traverse_rows(row, col, chessBoard, color) {
    // color used here if the color of the piece is opp then add it to arrays
    let left_row = []

    for (let i = col - 1; i >= 0; i--) {

        if (!chessBoard[row][i])
            left_row.push([row, i])
        else {
            if (chessBoard[row][i].color !== color)
                left_row.push([row, i])
            break
        }
    }

    let right_row = []

    for (let i = col + 1; i < 8; i++) {

        if (!chessBoard[row][i])
            right_row.push([row, i])
        else {
            if (chessBoard[row][i].color !== color)
                right_row.push([row, i])
            break
        }
    }

    return [left_row, right_row]
}


function traverse_cols(row, col, chessBoard, color) {

    let left_col = []

    for (let i = row - 1; i >= 0; i--) {

        if (!chessBoard[i][col])
            left_col.push([i, col])
        else {
            if (chessBoard[i][col].color !== color)
                left_col.push([i, col])
            break
        }
    }

    let right_col = []

    for (let i = row + 1; i < 8; i++) {

        if (!chessBoard[i][col])
            right_col.push([i, col])
        else {
            if (chessBoard[i][col].color !== color)
                right_col.push([i, col])
            break
        }
    }

    return [left_col, right_col]
}


export {
    traverse_rows,
    traverse_cols
}