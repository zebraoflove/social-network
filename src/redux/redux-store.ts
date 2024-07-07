import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import {combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
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
type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>
const store = configureStore({reducer: reducers})
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, any>
export default store