import appReducer, {actions, InitialStateType} from "./appReducer";

let state: InitialStateType
beforeEach(() => {
    state = {
        initialised: false
    }
})
test("correctly initialising", () => {
    const newState = appReducer(state, actions.initialised())
    expect(newState.initialised).toBeTruthy()
})