import {authAPI, ResultCodesEnum, StandardResponseType} from "../API/API";
import {authUser} from "./authReducer";
import {actions, initialiseApp} from "./appReducer";

jest.mock("../API/API")
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
const authResult: StandardResponseType<{id: number, email: string, login: string}> = {
    data: {id: 10, email: "email", login: "login"},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    authAPIMock.authUser.mockClear()
})
test("success initialised thunk", async () => {
    authAPIMock.authUser.mockReturnValue(Promise.resolve(authResult))
    const thunk = initialiseApp()
    thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, authUser())
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.initialised())
})