import dialogsReducer, {addMessage, deleteMessage} from "./dialogsReducer";
let state = {
    messagesData: [
        {id: 1, text: "Hey", belong: false},
        {id: 2, text: "What's up?", belong: false},
        {id: 3, text: "Everything's fine", belong: true},
        {id: 4, text: "Do you like donuts?", belong: true},
        {id: 5, text: "Of course", belong: false}
    ]
}
test('length of messages data should be increment', () => {
    let action = addMessage("Hello")
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData.length).toBe(6)
})
test('text of new message should be correct', () => {
    let action = addMessage("Hello")
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData[5].text).toBe("Hello")
})
test('after deleting length of messages data should be decrement', () => {
    let action = deleteMessage(2)
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData.length).toBe(4)
})