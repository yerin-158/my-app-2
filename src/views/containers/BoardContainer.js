import Board from "../components/Board";
import { connect } from 'react-redux';
import React from "react";
import {squareClick, winnerDetermined, drawEnds} from '../store/modules/actions';


const BoardContainer = ({history, status, xIsNext, squareClick, winnerDetermined, drawEnds}) => {
    const MAXIMUM_ROW = 3, MAXIMUM_COLUMN = 3;

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
    xIsNext : state.xIsNext
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
