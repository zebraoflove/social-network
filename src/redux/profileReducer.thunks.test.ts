import {profileAPI, ResultCodesEnum, StandardResponseType, UpdateAvatarResponseType} from "../API/API";
import {ContactsType, ProfileInfoType, ProfileType} from "../Types/types";
import {actions, requestStatus, requestUserProfile, saveAvatar, saveProfile, updateStatus} from "./profileReducer";

jest.mock("../API/API")
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
const getProfileResult: ProfileType = {
    userId: 1,
    aboutMe: "Hey",
    lookingForAJob: true,
    lookingForAJobDescription: "Description",
    fullName: "Bob",
    contacts: {
        github: null,
        vk: "vk.com",
        facebook: null,
        instagram: null,
        twitter: null,
        website: null,
        youtube: null,
        mainLink: null
    },
    photos: {small: null, large: null}
}
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    profileAPIMock.getUserProfile.mockClear()
    profileAPIMock.getStatus.mockClear()
    profileAPIMock.updateStatus.mockClear()
    profileAPIMock.updateProfileInfo.mockClear()
})
const UpdateStatusResponseResult: StandardResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const UpdateProfileInfoResponseResult: StandardResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const GetUserStatusResult: string = "My status"
test("success get user profile thunk", async () => {
    // @ts-ignore
    profileAPIMock.getUserProfile.mockReturnValue(Promise.resolve(getProfileResult))
    const thunk = requestUserProfile(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserProfile(getProfileResult))
})
test("success get user status thunk", async () => {
    // @ts-ignore
    profileAPIMock.getStatus.mockReturnValue(Promise.resolve(GetUserStatusResult))
    const thunk = requestStatus(5)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus(GetUserStatusResult))
})
test("success update user status thunk", async () => {
    profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(UpdateStatusResponseResult))
    const thunk = updateStatus("My status")
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setStatus("My status"))
})
test("success save profile info thunk", async () => {
    profileAPIMock.updateProfileInfo.mockReturnValue(Promise.resolve(UpdateProfileInfoResponseResult))
    getStateMock.mockReturnValue(1)
    const thunk = saveProfile(getProfileResult)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, requestUserProfile(1))
})