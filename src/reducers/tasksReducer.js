import initialState from './initialState'

export default function tasksReducer(state = initialState.tasks, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [{title: 'New Task', description: 'Your description', completed: false, id: Math.floor((Math.random() * 1000) + 1), time: null,
                timerRunning: false}, ...state];

        case 'EDIT_TASK':
            const updatedItems = state.map(item => {
                if(item.id === action.payload.id){

                    let editedItem = {
                        ...item
                    };

                    if(action.payload.field === 'title'){
                        editedItem.title = action.payload.change;
                    }
                    if(action.payload.field === 'description'){
                        editedItem.description = action.payload.change;
                    }
                    return editedItem
                }
                return item
            });
            return updatedItems;

        case 'DELETE_TASK':
            let filteredItems = state.filter(element => {
                return element.id !== action.payload
            });
            return filteredItems;

        case 'CHANGE_STATUS':
            const markedCompleted = state.map(item => {
                if(item.id === action.payload){
                    item.completed = (!item.completed);
                }
                return item
            });
            return markedCompleted;

        case 'ADD_TIME':
            const addedTime = state.map(item => {
                if(item.id === action.payload){
                    item.time++;
                }
                return item
            });
            return addedTime;

        case 'TIMER_TOGGLE':
            let copy = [...state];
            const setTimerRunning = copy.map(item => {
                if(item.id === action.payload){
                    item.timerRunning = !item.timerRunning;
                }
                return item
            });
            return setTimerRunning;

        default:
            return state
    }
}
