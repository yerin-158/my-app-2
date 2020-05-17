import React, {useEffect, useState} from "react";
import Board from './Board.js';

const Game = () => {

    const MAXIMUM_ROW = 3, MAXIMUM_COLUMN = 3;
    const initializeSquares = () => {
        const init = Array(MAXIMUM_ROW).fill(null);
        for (var i = 0; i < MAXIMUM_ROW; ++i) {
            var columns = Array(MAXIMUM_COLUMN).fill(null);
            for (var j = 0; j < MAXIMUM_COLUMN; ++j) {
                columns[j] = {index: i * MAXIMUM_COLUMN + j, value: null};
            }
            init[i] = columns;
        }
        return [{squares: init}];
    }

    const explain = 'Next Player : ';
    const [status, setStatus] = useState(explain + 'X');
    const [history, setHistory] = useState(initializeSquares);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [clickCount, setClickCount] = useState(0);

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
                return;
            }
        }

        if (clickCount == MAXIMUM_ROW * MAXIMUM_COLUMN) {
            setStatus('GAME-OVER');
            return;
        }

    }, [history]);

    const isWin = (...locations) => {
        for (let i = 1; i < locations.length; ++i) {
            const [rowNow, colNow] = locations[i - 1];
            const [rowNext, colNext] = locations[i];
            const mostRecentSquares = history[history.length - 1].squares;
            if (mostRecentSquares[rowNow][colNow].value == null
                || mostRecentSquares[rowNow][colNow].value !== mostRecentSquares[rowNext][colNext].value) {
                return false;
            }
        }
        return true;
    }

    const handleClick = (event) => {
        const [row, column] = getLocation(event.target.dataset.index);
        if (history[history.length - 1].squares[row][column].value == null) {
            setClickCount(clickCount + 1);
            setHistory(history.concat({squares: getNewSquares(row, column)}));
            setStatus(explain + (!xIsNext ? 'X' : 'O'));
            setXIsNext(!xIsNext);
        }
    }

    const getNewSquares = (row, column) => {
        var newSquares = JSON.parse(JSON.stringify(history[history.length - 1].squares));
        newSquares[row][column].value = (xIsNext ? 'X' : 'O');
        return newSquares;
    }

    const getLocation = (index) => {
        var row = parseInt(index / MAXIMUM_ROW);
        var column = index - MAXIMUM_COLUMN * row;
        return [row, column];
    }

    const jumpTo = (move) => {
        setStatus(explain + (move % 2 === 0 ? 'X' : 'O'));
        setXIsNext(move % 2 === 0);
        setHistory(history.slice(0, move + 1));
        setClickCount(move);
        if(winner != null){
            setWinner(null);
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={history[history.length - 1].squares}
                    handleClick={handleClick}
                    status={status}
                    winner={winner}
                />
            </div>
            <div className="game-info">
                {winner == null ?
                    <div className="status">{status}</div> :
                    <div className="status">{'Winner is ' + winner + ' !!!'}</div>
                }
                <ol>{
                    history.map((step, move) => {
                        return <li key={move}>
                            <button onClick={() => jumpTo(move)}>
                                {move ? 'Go to move #' + move : 'Go to game start'}
                            </button>
                        </li>
                    })
                }</ol>
            </div>
        </div>
    );
};

export default Game;
