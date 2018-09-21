export const TIMER_START = 'TIMER_START';
export const TIMER_TICK = 'TIMER_TICK';
export const TIMER_STOP = 'TIMER_STOP';


const initialState = {
    timer: false,
    counter: 0,
    lastTick: 0,
    taskId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TIMER_START: {
            return {
                ...state,
                timer: true,
                lastTick: Date.now(),
                taskId: action.payload
            };
        }
        case TIMER_TICK: {
            const now = Date.now();
            const diff = now - state.lastTick;

            return {
                ...state,
                counter: state.counter + diff,
                lastTick: now
            };
        }
        case TIMER_STOP : {
            return {
                timer: false,
                counter: 0,
                lastTick: 0,
                id: null
            };
        }
        default:
            return state;
    }
};

