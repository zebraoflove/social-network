import {AppStateType} from "./redux-store";
export const getInitialisedS = (state: AppStateType) => {
    return state.app.initialised
}