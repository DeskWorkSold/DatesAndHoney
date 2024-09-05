import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    mediatoruser: 'mediatoruser',
    ticketAddtoCard: 'ticketAddtoCard',
    status: 'status',
    packages: 'packages',
    Buypackages: 'Buypackages',
    chatuser: 'chatuser',
    itemsInCart: 'itemsInCart',
    events: 'events',
    porposalCat: 'porposalCat',
    paymentMethod: 'paymentMethod',
    paymentCardDetails: 'paymentCardDetails',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    cart: 'cart',
    usersLikedYou: 'usersLikedYou',
    paymentCards: "paymentCards",
    buyAdditionalPackages: 'buyAdditionalPackages',
    additionalPackages: 'additionalPackages',
    flakesBill: 'flakesBill',
    allUsers: 'allusers',
    myevents: 'myevents',
    conciergeSendRequest: 'conciergeSendRequest',
    depositAmount: 'depositAmount',
    walletAmount:'walletAmount',
    affiliatePrices:'affiliatePrices',
    initialState: {
        user: null,
        mediatoruser: null,
        ticketAddtoCard: null,
        status: false,
        porposalCat: null,
        packages: null,
        Buypackages: null,
        chatuser: null,
        events: null,
        paymentMethod: null,
        paymentCardDetails: null,
        hidden: true,
        cartItems: 0,
        itemsInCart: [],
        quantity: 0,
        totalCount: 0,
        usersLikedYou: null,
        paymentCards: null,
        buyAdditionalPackages: null,
        additionalPackages: null,
        flakesBill: null,
        allUsers: null,
        myevents: null,
        conciergeSendRequest: null,
        depositAmount:null,
        walletAmount:null,
        affiliatePrices:null,
        packageStatus:null
    },
    reducers: {
        login: (state, action) => {
            console.log(state.user, " : Login user");

            state.user = action.payload;
        },
        mediatorLogin: (state, action) => {
            console.log(state.mediatoruser, " : New MediatorUser");

            state.mediatoruser = action.payload;
        },
        TicketsAddtoCard: (state, action) => {
            console.log(state.ticketAddtoCard, " : New Item");

            state.ticketAddtoCard = action.payload;
        },
        status: (state, action) => {
            console.log(state.status, " : New status");

            state.status = action.payload;
        },
        PorposalCategory: (state, action) => {
            console.log(state.porposalCat, " : New category");

            state.porposalCat = action.payload;
        },
        packages: (state, action) => {
            console.log(state.packages, " : New Packages");

            state.packages = action.payload;
        },
        Buypackages: (state, action) => {
            console.log(state.Buypackages, " : New BuyPackages");

            state.Buypackages = action.payload;
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
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            if (itemInCart) {
                itemInCart.qty += action.payload.qty;
                itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
            }
            else {
                state.itemsInCart.push({ ...action.payload })
                // console.log(state.itemsInCart, "ADD TO CART")
                // state.itemsInCart = [...state.itemsInCart, action.payload]
            }
            // if (action.payload) {
            // restaurantName :  action.payload.restaurantName,
            // }
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
        removeFromCart: (state, action) => {
            const removeFromCart = state.itemsInCart.filter((item) => item.uid !== action.payload.uid);
            state.itemsInCart = removeFromCart;
        },
        incrementQty: (state, action) => {
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            // itemInCart.qty++;
            itemInCart.qty += 1;
            itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
        },
        decrementQty: (state, action) => {
            const itemInCart = state.itemsInCart.find((item) => item.uid == action.payload.uid);
            if (itemInCart.qty == 1) {
                const removeFromCart = state.itemsInCart.filter((item) => item.uid !== action.payload.uid);
                state.itemsInCart = removeFromCart;
            }
            else {
                itemInCart.qty -= 1;
                itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
            }
        },
        PaymentMethod: (state, action) => {
            console.log(state.paymentMethod, " : New payment-Method");

            state.paymentMethod = action.payload;
        },
        PaymentCardDetails: (state, action) => {
            console.log(state.paymentCardDetails, " : New payment-Card-Details");

            state.paymentCardDetails = action.payload;
        },
        UsersLikedYou: (state, action) => {
            console.log(state.usersLikedYou, " : New UsersLikedYou");

            state.usersLikedYou = action.payload;
        },
        PaymentCards: (state, action) => {
            // console.log(state.paymentCards, " : New PaymentCards");

            state.paymentCards = action.payload;
        },
        BuyAdditionalPackages: (state, action) => {
            console.log(state.buyAdditionalPackages, " : New buyAdditionalPackages");

            state.buyAdditionalPackages = action.payload;
        },
        AdditionalPackages: (state, action) => {
            console.log(state.additionalPackages, " : New additionalPackages");

            state.additionalPackages = action.payload;
        },
        FlakesBill: (state, action) => {
            console.log(state.flakesBill, " : New FlakesBill");

            state.flakesBill = action.payload;
        },
        AllUsers: (state, action) => {
            console.log(state.allUsers, " : Get allusers");

            state.allUsers = action.payload;
        },
        Myevents: (state, action) => {
            console.log(state.myevents, " : My Events");

            state.myevents = action.payload;
        },
        ConciergeSendRequest: (state, action) => {
            console.log(state.conciergeSendRequest, " : Concierge send req");

            state.conciergeSendRequest = action.payload;
        },
        DepositAmount: (state, action) => {
            console.log(state.depositAmount, " : deposit Amount");

            state.depositAmount = action.payload;
        },
        WalletAmount: (state, action) => {
            console.log(state.walletAmount, " : Wallet Amount");

            state.walletAmount = action.payload;
        },
        AffiliatePrices: (state, action) => {
            console.log(state.affiliatePrices, " : Affiliate Prices");

            state.affiliatePrices = action.payload;
        },
        // PackageStatus: (state, action) => {
        //     console.log(state.packageStatus, " : Package Status");

        //     state.packageStatus = action.payload;
        // },
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

export const { login, mediatorLogin, TicketsAddtoCard, status, packages, Buypackages, logout, chatuser, events, addToCart, removeFromCart, incrementQty, decrementQty, PaymentMethod, PaymentCardDetails, PorposalCategory, UsersLikedYou, PaymentCards, AdditionalPackages, BuyAdditionalPackages, FlakesBill, AllUsers, Myevents, ConciergeSendRequest, DepositAmount, WalletAmount, AffiliatePrices } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectPackages = (state) => state.user.packages;
export const selectBuypackages = (state) => state.user.Buypackages;
export const selectChatuser = (state) => state.user.chatuser;
export const selectEvents = (state) => state.user.events;
export const selectaddToCart = (state) => state.user.itemsInCart;
export const selectMediatorUser = (state) => state.user.mediatoruser;
export const selectTicketsAddToCard = (state) => state.user.ticketAddtoCard;
export const selectPaymentMethod = (state) => state.user.paymentMethod;
export const selectPaymentCardDetails = (state) => state.user.paymentCardDetails;
export const selectPorposalCategory = (state) => state.user.porposalCat;
export const selectUsersLikedYou = (state) => state.user.usersLikedYou;
export const selectPaymentCards = (state) => state.user.paymentCards;
export const selectAdditionalPackages = (state) => state.user.additionalPackages;
export const selectBuyAdditionalPackages = (state) => state.user.buyAdditionalPackages;
export const selectFlakesBill = (state) => state.user.flakesBill;
export const selectAllUsers = (state) => state.user.allUsers;
export const selectMyevents = (state) => state.user.myevents;
export const selectConciergeSendRequest = (state) => state.user.conciergeSendRequest;
export const selectDepositAmount = (state) => state.user.depositAmount;
export const selectWalletAmount = (state) => state.user.walletAmount;
export const selectAffiliatePrices = (state) => state.user.affiliatePrices;
// export const selectPackageStatus = (state) => state.user.packageStatus;


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

