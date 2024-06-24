import {authUser} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const INITIALISED = "INITIALISED"
type InitialStateType = {initialised: boolean}
type InitialisedActionType = {type: typeof INITIALISED}
type ActionType = InitialisedActionType
let initialState: InitialStateType = {
    initialised: false
}
const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case INITIALISED: {
            return {...state, initialised: true}
        }
        default: {
            return state
        }
    }
}
export const initialised = (): InitialisedActionType => ({type: INITIALISED})
export const initialiseApp = (): ThunkAction<void, AppStateType, unknown,
    ActionType> => (dispatch) => {
    let promise = dispatch(authUser())
    promise.then(() => {
        dispatch(initialised())
    })
}
export default appReducer