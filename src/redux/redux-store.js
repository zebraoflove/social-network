import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

const store = configureStore({reducer: reducers})
window.__store__ = store
export default store