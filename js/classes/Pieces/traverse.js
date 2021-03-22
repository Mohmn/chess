function traverse_rows(row,col,chessBoard){

    let left_row = [] 

    for(let i=col-1;i>=0;i--){

        if(!chessBoard[row][i])
            left_row.push([row,i])
        else
            break
    }

    let right_row = []
    
    for(let i=col+1;i<8;i++){

        if(!chessBoard[row][i])
            right_row.push([row,i])
        else
            break
    }

    return [left_row,right_row]
}


function traverse_cols(row,col,chessBoard){

    let left_row = [] 

    for(let i=row-1;i>=0;i--){

        if(!chessBoard[i][col])
            left_row.push([i,col])
        else
            break
    }

    let right_row = []
    
    for(let i=row+1;i<8;i++){

        if(!chessBoard[row][i])
            right_row.push([i,col])
        else
            break
    }

    return [left_row,right_row]
}


export {traverse_rows,traverse_cols}