import {handleActions} from 'redux-actions'
import type from './types';

const initializeSquares = () => {
    const MAXIMUM_ROW = 3, MAXIMUM_COLUMN = 3;
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

const initialState = {
    history : initializeSquares(),
    xIsNext : true,
    clickCount : 0,
    status : 'Next Player : X'
}

export default handleActions({
    [type.SQUARE_CLICK]: (state, action) => ({
        ...state,
        history: state.history.concat({squares : action.payload}),
        status: 'Next Player : '+(state.xIsNext ? 'O' : 'X'),
        xIsNext: !state.xIsNext,
        clickCount: state.clickCount+1,
    }),
    [type.GO_TO_HISTORY]: (state, action) => ({
        ...state,
        history: state.history.slice(0, action.payload + 1),
        clickCount: action.payload
    }),
    [type.WINNER_DETERMINED]: (state, action) => ({
        ...state,
        status: 'Winner is '+(state.xIsNext ? 'O' : 'X')
    }),
    [type.DRAW_ENDS]: (state, action) => ({
        ...state,
        status : 'GAME-OVER'
    })
  },
  initialState
);
