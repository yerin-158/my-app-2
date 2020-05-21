import Board from "../components/Board";
import { connect } from 'react-redux';
import React, {useEffect} from "react";
import {squareClick, winnerDetermined, drawEnds} from '../store/modules/actions';


const BoardContainer = ({history, status, xIsNext, clickCount, squareClick, winnerDetermined, drawEnds}) => {
    const MAXIMUM_ROW = 3, MAXIMUM_COLUMN = 3;

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
                winnerDetermined();
                return;
            }
        }

        if (clickCount == MAXIMUM_ROW * MAXIMUM_COLUMN) {
            drawEnds();
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
            squareClick(getNewSquares(row, column));
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

    return <Board
        squares={history[history.length - 1].squares}
        handleClick={handleClick}
        status={status}
    />
}

const mapStateToProps = (state) => ({
    history: state.history,
    status: state.status,
    xIsNext : state.xIsNext,
    clickCount : state.clickCount
});

const mapDispatchToProps = dispatch => ({
    squareClick: (squares) => dispatch(squareClick(squares)),
    winnerDetermined: () => dispatch(winnerDetermined()),
    drawEnds: () => dispatch(drawEnds())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardContainer);
