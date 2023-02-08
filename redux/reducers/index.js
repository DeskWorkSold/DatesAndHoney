import { combineReducers } from "redux";
import Reducers from "./Reducers";

let cartreducers = combineReducers({
    Reducers : Reducers,
})

const rootReducer = (state, action) => {
    return cartreducers(state, action);
}

export default rootReducer;
