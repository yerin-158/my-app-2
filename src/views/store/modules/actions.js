import { createAction } from 'redux-actions';
import { type } from './types';

export const squareClick = createAction(
    type.SQUARE_CLICK, squares => squares
);

export const goToHistory = createAction(
    type.GO_TO_HISTORY, move => move
);

export const winnerDetermined = createAction(
    type.WINNER_DETERMINED
);

export const drawEnds = createAction(
    type.DRAW_ENDS
)
