import {AppStateType} from "./redux-store";
export const getLoginS = (state: AppStateType) => {
    return state.auth.login
}
export const getIsAuthS = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getUserIdS = (state: AppStateType) => {
    return state.auth.id
}
export const getCaptchaUrlS = (state: AppStateType) => {
    return state.auth.captchaUrl
}