import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    mediatoruser: 'mediatoruser',
    status: 'status',
    packages: 'status',
    chatuser: 'chatuser',
    events: 'events',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    cart: 'cart',
    initialState: {
        user: null,
        mediatoruser: null,
        status: false,
        packages: null,
        chatuser: null,
        events: null,
        hidden: true,
        cartItems: 0,
        itemsInCart: [],
        quantity: 0,
        totalCount: 0,
    },
    reducers: {
        login: (state, action) => {
            console.log(state.user, " : New user");

            state.user = action.payload;
        },
        mediatorLogin: (state, action) => {
            console.log(state.mediatoruser, " : New MediatorUser");

            state.mediatoruser = action.payload;
        },
        status: (state, action) => {
            console.log(state.status, " : New status");

            state.status = action.payload;
        },
        packages: (state, action) => {
            console.log(state.packages, " : New Packages");

            state.packages = action.payload;
        },
        chatuser: (state, action) => {
            console.log(state.chatuser, " : New chatuser");

            state.chatuser = action.payload;
        },
        events: (state, action) => {
            console.log(state.events, " : New Events");

            state.events = action.payload;
        },
        addToCart(state, action) {
            //   console.log(state.itemsInCart , ": ADD TO CART");
            //   let newState = { ...state.itemsInCart };
            if (action.payload) {
                console.log("ADD TO CART")
                state.itemsInCart = [...state.itemsInCart, action.payload]
                // restaurantName :  action.payload.restaurantName,
            }
            //   state.itemsInCart = payload;
            //   return[...state.itemsInCart,  action.payload];
            //uid is the unique id of the item
            // const { id } = payload;

            // const find = state.find((item) => item?.id === id);
            // if (find) {
            //     return state.map((item) =>
            //         item.id === id
            //             ? {
            //                 ...item,
            //                 qty: item.qty + 1,
            //             }
            //             : item
            //     );
            // } else {
            //     state.push({
            //         ...payload,
            //         qty: 1,
            //     });
            // }
        },
        logout: (state) => {
            console.log(state.user, " : Delete user");

            state.user = null;
            state.status = false;
            state.packages = null;
            state.chatuser = null;
            state.mediatoruser = null;
        },
    },
});

export const { login, mediatorLogin, status, packages, logout, chatuser, events, addToCart } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectPackages = (state) => state.user.packages;
export const selectChatuser = (state) => state.user.chatuser;
export const selectEvents = (state) => state.user.events;
export const selectaddToCart = (state) => state.user.addToCart;
export const selectMediatorUser = (state) => state.user.mediatoruser;


export default userSlice.reducer;
// import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

// export const Reducers = (state = [], action) => {
//     switch (action.type) {
//         case ADD_ITEM:
//             console.log(state, 'new state here!');
//             return [...state, action.payload];

//         case REMOVE_ITEM:
//             const deleteArry = state.filter((Item, index) => {
//                 return (index != action.payload);
//             });
//             return deleteArry;
//         default:
//             return state;
//     }
// }

