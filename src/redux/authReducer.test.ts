import authReducer, {actions, InitialStateType} from "./authReducer";

let state: InitialStateType
beforeEach(() => {
    state = {
        id: null as null | number,
        email: null as null | string,
        login: null as null | string,
        isAuth: false,
        isFetched: true,
        captchaUrl: null as null | string
    }
})
test("correctly setting fetched", () => {
    const newState = authReducer(state, actions.setFetched(false))
    expect(newState.isFetched).toBeFalsy()
})
test("correctly setting user data", () => {
    const newState = authReducer(state, actions.setUserData(1, "email", "login", true))
    expect(newState.email).toBe("email")
    expect(newState.isAuth).toBeTruthy()
})
test("correctly setting captcha url", () => {
    const newState = authReducer(state, actions.setCaptchaUrl("captcha.url"))
    expect(newState.captchaUrl).toBe("captcha.url")
})