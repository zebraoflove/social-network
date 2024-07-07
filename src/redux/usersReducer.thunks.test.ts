import {actions, FilterType, followUser, requestUsers, unfollowUser} from "./usersReducer"
import {ResultCodesEnum, StandardResponseType, followAPI, usersAPI, GetUsersResponseType} from "../API/API";

jest.mock("../API/API")
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
const followResult: StandardResponseType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: []
}
const getUsersResult: GetUsersResponseType = {
    items: [
        {id: 0, name: "Andrey0", status: "Status0", photos: {small: null, large: null}, followed: false},
        {id: 1, name: "Andrey1", status: "Status1", photos: {small: null, large: null}, followed: false},
        {id: 2, name: "Andrey2", status: "Status2", photos: {small: null, large: null}, followed: true},
        {id: 3, name: "Andrey3", status: "Status3", photos: {small: null, large: null}, followed: true},
        {id: 4, name: "Andrey4", status: "Status4", photos: {small: null, large: null}, followed: false},
        {id: 5, name: "Andrey5", status: "Status5", photos: {small: null, large: null}, followed: false}
    ],
    totalCount: 13,
    error: null
}
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    followAPIMock.followUser.mockClear()
    followAPIMock.unfollowUser.mockClear()
    usersAPIMock.getUsers.mockClear()
})
test("success follow thunk", async () => {
    followAPIMock.followUser.mockReturnValue(Promise.resolve(followResult))
    const thunk = followUser(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.changeFollowing(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 1))
})
test("success unfollow thunk", async () => {
    followAPIMock.unfollowUser.mockReturnValue(Promise.resolve(followResult))
    const thunk = unfollowUser(2)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowing(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.changeFollowing(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowing(false, 2))
})
test("success request users thunk", async () => {
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))
    let newFilter: FilterType = {term: "", isFriend: "All"}
    const thunk = requestUsers(1, 6, newFilter)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(6)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFetched(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFilter(newFilter))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setCurrentPage(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setFetched(false))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setUsers(getUsersResult.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(6, actions.setTotalUsersCount(13))
})