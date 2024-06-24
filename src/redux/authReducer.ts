import {authAPI, AuthUserResponseType, ResultCodesEnum, ResultCodeWithCaptcha} from "../API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {AxiosResponse} from "axios";
const SET_FETCHED = "SET-FETCHED"
const SET_USER_DATA = "SET-USER-DATA"
const SET_CAPTCHA_URL = "SET-CAPTCHA-URL"
type initialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    isFetched: boolean,
    captchaUrl: string | null
}
let initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetched: true,
    captchaUrl: null
}
const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case SET_FETCHED: {
            return {...state, isFetched: action.isFetched}
        }
        case SET_CAPTCHA_URL: {
            return {...state, captchaUrl: action.url}
        }
        default: {
            return state
        }
    }
}
type SetFetchedActionType = {type: typeof SET_FETCHED, isFetched: boolean}
type SetUserDataActionPayloadType = {id: number | null, email: string | null, login: string | null, isAuth: boolean}
type SetUserDataActionType = {type: typeof SET_USER_DATA, payload: SetUserDataActionPayloadType}
type SetCaptchaUrlActionType = {type: typeof SET_CAPTCHA_URL, url: string | null}
type ActionType = SetFetchedActionType | SetUserDataActionType | SetCaptchaUrlActionType
export const setFetched = (isFetched: boolean): SetFetchedActionType => ({type: SET_FETCHED, isFetched})
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
export const setCaptchaUrl = (url: string | null): SetCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, url})
export const authUser = (): ThunkAction<Promise<AuthUserResponseType>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    dispatch(setFetched(true))
    let response = await authAPI.authUser()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data
        dispatch(setUserData(id, email, login, true))
    }
    dispatch(setFetched(false))
    return response
}
export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkAction<Promise<void>,
    AppStateType, unknown, ActionType> => async (dispatch) => {
    let data = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(authUser())
        dispatch(setCaptchaUrl(null))
    } else if (data.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha())
    } else alert(data.messages[0])
}
export const logoutUser = (): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let data = await authAPI.logoutUser()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setUserData(null, null, null, false))
    } else alert("Warning")
}
export const getCaptcha = (): ThunkAction<Promise<void>, AppStateType, unknown,
    ActionType> => async (dispatch) => {
    let data = await authAPI.getCaptcha()
    dispatch(setCaptchaUrl(data.url))
}
export default authReducer