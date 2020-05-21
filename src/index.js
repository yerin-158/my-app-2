import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './views/store/modules/reducers';

import { Provider } from 'react-redux';

import './index.css';
import BoardContainer from "./views/containers/BoardContainer";
import TimeLineContainer from "./views/containers/TimeLineContainer";

const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <div className="game">
            <BoardContainer />
            <TimeLineContainer />
        </div>
    </Provider>,
    document.getElementById('root')
);
