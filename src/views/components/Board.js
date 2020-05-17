import React, {useEffect, useState} from "react";
import Square from "./Square.js";

const Board = ({init}) => {
    const status = 'Next Player : ';
    const [squares, setSquares] = useState(init);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);


    useEffect(() => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; ++i) {
            const [a, b, c] = lines[i];
            if (isWin(getLocation(a), getLocation(b), getLocation(c))) {
                setWinner(xIsNext ? 'O' : 'X');
                break;
            }
        }
    }, [squares]);

    const isWin = (...locations) => {
        for (let i = 1; i < locations.length; ++i) {
            const [rowNow, colNow] = locations[i - 1];
            const [rowNext, colNext] = locations[i];
            if (squares[rowNow][colNow].value == null || squares[rowNow][colNow].value !== squares[rowNext][colNext].value) {
                return false;
            }
        }
        return true;
    }

    const handleClick = (event) => {
        const [row, column] = getLocation(event.target.dataset.index);
        if (squares[row][column].value == null) {
            setSquares(getNewSquares(row, column));
            setXIsNext(!xIsNext);
        }
    }

    const getNewSquares = (row, column) => {
        var newSquares = squares.slice();
        newSquares[row][column].value = (xIsNext ? 'X' : 'O')
        return newSquares;
    }

    const getLocation = (index) => {
        var row = parseInt(index / squares[0].length);
        var column = index - squares[0].length * row;
        return [row, column];
    }

    return (
        <div>
            {winner == null ?
                <div className="status">{status + (xIsNext ? 'X' : 'O')}</div> :
                <div className="status">{'Winner is ' + winner + ' !!!'}</div>
            }
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
