import {authAPI} from "../API/API";
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
export const setFetched = (isFetched: boolean): SetFetchedActionType => ({type: SET_FETCHED, isFetched})
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})
export const setCaptchaUrl = (url: string | null): SetCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, url})
export const authUser = () => async (dispatch: any) => {
    dispatch(setFetched(true))
    let response = await authAPI.authUser()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setUserData(id, email, login, true))
    }
    dispatch(setFetched(false))
    return response
}
export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let response = await authAPI.loginUser(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authUser())
        dispatch(setCaptchaUrl(null))
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptcha())
    } else alert(response.data.messages[0])
}
export const logoutUser = () => async (dispatch: any) => {
    let response = await authAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    } else alert("Warning")
}
export const getCaptcha = () => async (dispatch: any) => {
    let response = await authAPI.getCaptcha()
    dispatch(setCaptchaUrl(response.data.url))
}
export default authReducer