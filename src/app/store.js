import { configureStore } from '@reduxjs/toolkit'

const inputReducer = (state = [], action) => {
    switch(action.type){
        case 'clear': return [];
        case 'input': return action.payload;
        default: return state;
    }
}

const outputReducer = (state = 0, action) => {
    switch(action.type){
        case 'clear': return 0
        case 'output': return action.payload
        default: return state;
    }
}

const store = configureStore({
    reducer: {
        input: inputReducer,
        output: outputReducer,
    }
})

export default store