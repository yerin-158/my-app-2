import React, {useEffect, useState} from "react";
import Square from "./Square.js";

const Board = ({init}) => {
    const status = 'Next player: X';
    const [squares, setSquares] = useState(init);

    const handleClick = (event) => {
        var index = parseInt(event.target.dataset.index);
        var row = parseInt(index / squares[0].length);
        var column = index - squares[0].length * row;
        var newSquares = squares.slice();
        // eslint-disable-next-line no-unused-expressions
        newSquares[row][column].value = 'X';
        setSquares(newSquares);
    }

    return (
        <div>
            <div className="status">{status}</div>
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
