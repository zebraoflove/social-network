import {authAPI, StandardResponseType, ResultCodesEnum, ResultCodeWithCaptcha} from "../API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    isFetched: true,
    captchaUrl: null as null | string
}
type initialStateType = typeof initialState
const actions = {
    setFetched: (isFetched: boolean) => ({type: "SN/AUTH/SET-FETCHED", isFetched} as const),
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: "SN/AUTH/SET-USER-DATA", payload: {id, email, login, isAuth}} as const),
    setCaptchaUrl: (url: string | null) => ({type: "SN/AUTH/SET-CAPTCHA-URL", url} as const)
}
type ActionType = InferActionsTypes<typeof actions>
const authReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {

        case "SN/AUTH/SET-USER-DATA": {
            return {...state, ...action.payload}
        }
        case "SN/AUTH/SET-FETCHED": {
            return {...state, isFetched: action.isFetched}
        }
        case "SN/AUTH/SET-CAPTCHA-URL": {
            return {...state, captchaUrl: action.url}
        }
        default: {
            return state
        }
    }
}
export const authUser = (): ThunkAction<Promise<StandardResponseType>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    dispatch(actions.setFetched(true))
    let response = await authAPI.authUser()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(actions.setUserData(id, email, login, true))
    }
    dispatch(actions.setFetched(false))
    return response
}
export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    let data = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authUser())
        dispatch(actions.setCaptchaUrl(null))
    } else if (data.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha())
    } else alert(data.messages[0])
}
export const logoutUser = (): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let data = await authAPI.logoutUser()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserData(null, null, null, false))
    } else alert("Warning")
}
export const getCaptcha = (): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let data = await authAPI.getCaptcha()
    dispatch(actions.setCaptchaUrl(data.url))
}
export default authReducer