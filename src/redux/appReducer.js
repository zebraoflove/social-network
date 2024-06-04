import {authUser} from "./authReducer";

const INITIALISED = "INITIALISED"

let initialState = {
    initialised: false
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALISED: {
            return {...state, initialised: true}
        }
        default: {
            return state
        }
    }
}
export const initialised = () => ({type: INITIALISED})
export const initialiseApp = () => (dispatch) => {
    let promise = dispatch(authUser())
    promise.then(() => {
        dispatch(initialised())
    })
}
export default appReducer