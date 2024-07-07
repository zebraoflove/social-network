import {authAPI, CaptchaResponseType, ResultCodesEnum, ResultCodeWithCaptchaEnum, StandardResponseType} from "../API/API";
import {actions, authUser, getCaptcha, loginUser, logoutUser} from "./authReducer";

jest.mock("../API/API")
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
const authResult: StandardResponseType<{id: number, email: string, login: string}> = {
    data: {id: 10, email: "email", login: "login"},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const loginResult: StandardResponseType<{userId: number}> = {
    data: {userId: 10},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const loginWithCaptchaResult: StandardResponseType<{}, ResultCodeWithCaptchaEnum> = {
    data: {},
    resultCode: ResultCodeWithCaptchaEnum.CaptchaIsRequired,
    messages: []
}
const logoutResult: StandardResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const getCaptchaResult: CaptchaResponseType = {
    url: "captcha.url"
}
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    authAPIMock.authUser.mockClear()
})
test("success auth thunk", async () => {
    authAPIMock.authUser.mockReturnValue(Promise.resolve(authResult))
    const thunk = authUser()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFetched(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUserData(10, "email", "login", true))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFetched(false))
})
test("success login thunk", async () => {
    authAPIMock.loginUser.mockReturnValue(Promise.resolve(loginResult))
    const thunk = loginUser("email2", "password123", false, null)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCaptchaUrl(null))
})
test("success login thunk(with captcha)", async () => {
    authAPIMock.loginUser.mockReturnValue(Promise.resolve(loginWithCaptchaResult))
    const thunk = loginUser("email2", "password123", false, null)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
})
test("success logout thunk", async () => {
    authAPIMock.logoutUser.mockReturnValue(Promise.resolve(logoutResult))
    const thunk = logoutUser()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserData(null, null, null, false))
})
test("success get captcha thunk", async () => {
    authAPIMock.getCaptcha.mockReturnValue(Promise.resolve(getCaptchaResult))
    const thunk = getCaptcha()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setCaptchaUrl("captcha.url"))
})