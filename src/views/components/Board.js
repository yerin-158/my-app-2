import React, {useEffect, useState} from "react";
import Square from "./Square.js";

const Board = ({init}) => {
    const status = 'Next player: ';
    const [squares, setSquares] = useState(init);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (event) => {
        const [row, column] = getLocation(event);
        if ( squares[row][column].value == null ){
            setSquares(getNewSquares(row, column));
            setXIsNext(!xIsNext);
        }
    }

    const getNewSquares = (row, column) => {
        var newSquares = squares.slice();
        newSquares[row][column].value = (xIsNext ? 'X' : 'O')
        return newSquares;
    }

    const getLocation = (event) => {
        var index = parseInt(event.target.dataset.index);
        var row = parseInt(index / squares[0].length);
        var column = index - squares[0].length * row;
        return [row, column];
    }

    return (
        <div>
            <div className="status">{status + (xIsNext ? 'X' : 'O')}</div>
            {squares.map(row =>
                <div className="board-row">
                    {row.map(column =>
                        <Square
                            value={column.value}
                            index={column.index}
                            handleClick={handleClick}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Board;
