import React from "react";
import Board from './Board.js';

const Game = () => {

    const initializeSquares = () => {
        const ROW = 3, COLUMN = 3;
        const init = Array(ROW).fill(null);
        for(var i = 0; i<ROW; ++i){
            var columns = Array(COLUMN).fill(null);
            for(var j = 0; j<COLUMN; ++j){
                // eslint-disable-next-line no-unused-expressions
                columns[j] = {index: i*COLUMN+j, value: null};
            }
            init[i] = columns;
        }
        return init;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board init={initializeSquares}/>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

export default Game;
