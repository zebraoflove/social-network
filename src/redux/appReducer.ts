import {authUser} from "./authReducer";
const INITIALISED = "INITIALISED"
type InitialStateType = {initialised: boolean}
type InitialisedActionType = {type: typeof INITIALISED}
let initialState: InitialStateType = {
    initialised: false
}
const appReducer = (state = initialState, action: any): InitialStateType => {
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
export const initialiseApp = () => (dispatch: any) => {
    let promise = dispatch(authUser())
    promise.then(() => {
        dispatch(initialised())
    })
}
export default appReducer