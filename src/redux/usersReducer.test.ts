import usersReducer, {actions, InitialStateType} from "./usersReducer"

let state: InitialStateType
beforeEach(() => {
        state = {
            users: [
                {id: 0, name: "Andrey0", status: "Status0", photos: {small: null, large: null}, followed: false},
                {id: 1, name: "Andrey1", status: "Status1", photos: {small: null, large: null}, followed: false},
                {id: 2, name: "Andrey2", status: "Status2", photos: {small: null, large: null}, followed: true},
                {id: 3, name: "Andrey3", status: "Status3", photos: {small: null, large: null}, followed: true}
            ],
            pageSize: 10,
            totalUsersCount: 50,
            currentPage: 1,
            isFetched: true,
            followingInProgress: [1, 3] as Array<number>,
            term: "",
            isFriend: "All"
        }
    }
)
test("correctly follow user", () => {
    const newState = usersReducer(state, actions.changeFollowing(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("correctly unfollow user", () => {
    const newState = usersReducer(state, actions.changeFollowing(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})
test("correctly set users", () => {
    const newState = usersReducer(state, actions.setUsers([
        {id: 0, name: "Maxim0", status: "Status0", photos: {small: null, large: null}, followed: false},
        {id: 1, name: "Maxim1", status: "Status1", photos: {small: null, large: null}, followed: false},
        {id: 2, name: "Maxim2", status: "Status2", photos: {small: null, large: null}, followed: true},
        {id: 3, name: "Maxim3", status: "Status3", photos: {small: null, large: null}, followed: true}
    ]))
    expect(newState.users[2].name).toBe("Maxim2")
})
test("correctly set current page", () => {
    const newState = usersReducer(state, actions.setCurrentPage(3))
    expect(newState.currentPage).toBe(3)
})
test("correctly set current page", () => {
    const newState = usersReducer(state, actions.setCurrentPage(3))
    expect(newState.currentPage).toBe(3)
})
test("correctly set term", () => {
    const newState = usersReducer(state, actions.setTerm("Alex"))
    expect(newState.term).toBe("Alex")
})
test("correctly set friend", () => {
    const newState = usersReducer(state, actions.setFriend("Followed"))
    expect(newState.isFriend).toBe("Followed")
})
test("correctly set following in progress", () => {
    const newState = usersReducer(state, actions.toggleFollowing(true, 2))
    expect(newState.followingInProgress.length).toBe(3)
})
test("correctly unset following in progress", () => {
    const newState = usersReducer(state, actions.toggleFollowing(false, 1))
    expect(newState.followingInProgress.length).toBe(1)
})
test("correctly set friend", () => {
    const newState = usersReducer(state, actions.setFetched(false))
    expect(newState.isFetched).toBe(false)
})