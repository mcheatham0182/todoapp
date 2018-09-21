
export function addTask(task) {
    return {
        type: 'ADD_TASK'
    }
}

export function editTask(id, change, field) {
    return {
        type: 'EDIT_TASK',
        payload: {change: change, field: field,  id: id}
    }
}
export function deleteTask(id) {
    return {
        type: 'DELETE_TASK',
        payload: id
    }
}
export function changeStatus(id) {
    return {
        type: 'CHANGE_STATUS',
        payload: id
    }
}


let timer = null;

export const timerStart = (id) => dispatch => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(timerTick(id)), 1000);
    dispatch({ type: 'TIMER_START', payload: id });
    dispatch({ type: 'TIMER_TOGGLE', payload: id});
    dispatch(timerTick());
};

export const timerTick = (id) => dispatch => {
    dispatch({ type: 'TIMER_TICK' });
    dispatch({type: 'ADD_TIME', payload: id});
};

export const timerStop = (id) => dispatch => {
    clearInterval(timer);
    dispatch({ type: 'TIMER_STOP' });
    if(id !== undefined){
        dispatch({ type: 'TIMER_TOGGLE', payload: id});
    }

};
