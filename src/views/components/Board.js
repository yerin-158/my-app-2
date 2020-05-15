import React from "react";
import Square from "./Square.js";

const Board = ({squares}) => {
    const status = 'Next player: X';

    return (
        <div>
            <div className="status">{status}</div>
            {squares.map(row =>
                <div className="board-row">
                    {row.map(column =>
                        <Square index={column}/>
                    )}
                </div>
            )}
        </div>
    );
}

export default Board;
