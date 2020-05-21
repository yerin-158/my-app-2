import TimeLine from "../components/TimeLine";
import {connect} from 'react-redux';
import React from "react";
import {goToHistory} from '../store/modules/actions'

const TimeLineContainer = ({history, status, goToHistory}) => {

    return <TimeLine
        history={history}
        status={status}
        goToHistory={goToHistory}
    />
}

const mapStateToPros = (state) => ({
    history: state.history,
    status: state.status,
})

const mapDispatchToProps = dispatch => ({
    goToHistory: move => dispatch(goToHistory(move))
})

export default connect(
    mapStateToPros,
    mapDispatchToProps
)(TimeLineContainer)
