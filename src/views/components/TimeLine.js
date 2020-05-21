import React from "react";

const TimeLine = ({status, history, goToHistory}) => {

    return (
        <div className="game-info">
            <div className="status">{status}</div>
            <ol>{
                history.map((step, move) => {
                    return <li key={move}>
                        <button onClick={() => goToHistory(move)}>
                            {move ? 'Go to move #' + move : 'Go to game start'}
                        </button>
                    </li>
                })
            }</ol>
        </div>
    );
}

export default TimeLine;
