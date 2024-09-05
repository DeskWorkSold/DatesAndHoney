import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/Reducers";


export default configureStore({
    reducer: {
        user: userReducer,
        // Packages: userReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});
 
