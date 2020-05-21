import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './views/store/modules/reducers';

import { Provider } from 'react-redux';

import Game from './views/components/Game';
import './index.css';
import BoardContainer from "./views/containers/BoardContainer";

const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <BoardContainer />
    </Provider>,
    document.getElementById('root')
);
