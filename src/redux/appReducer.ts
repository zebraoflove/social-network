import {authUser} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
type ActionType = InferActionsTypes<typeof actions>
let initialState = {
    initialised: false
}
export const actions = {
    initialised: () => ({type: "SN/APP/INITIALISED"} as const)
}
export type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALISED": {
            return {...state, initialised: true}
        }
        default: {
            return state
        }
    }
}
export const initialiseApp = (): ThunkAction<void, AppStateType, unknown,
    ActionType> => (dispatch) => {
    let promise = dispatch(authUser())
    promise.then(() => {
        dispatch(actions.initialised())
    })
}
export default appReducer