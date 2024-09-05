import { ADD_ITEM, REMOVE_ITEM } from "../ActionTypes";

export const CartReducers = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            {
                return [...state, action.payload]
            }
        case REMOVE_ITEM:
            const deletarry = action.payload.filter((item, index) => {
                return (index = action.payload);
            });
            return deletarry;

        default:
            return state;
    }
}