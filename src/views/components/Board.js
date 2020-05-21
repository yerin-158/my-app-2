import React, {useEffect, useState} from "react";
import Square from "./Square.js";

const Board = ({squares, handleClick, status}) => {

    return (
        <div>
            <div className="status"><h3>{status}</h3></div>
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
