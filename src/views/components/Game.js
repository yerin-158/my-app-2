import React from "react";
import Board from './Board.js';

const Game = () => {
    const squares = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
        ];

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares}/>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

export default Game;
