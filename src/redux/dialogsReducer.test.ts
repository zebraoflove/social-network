import dialogsReducer, {actions, InitialStateType} from "./dialogsReducer";
let state: InitialStateType = {
    usersData: [
        {
            id: 1, name: 'Igor',
            ava: "https://yt3.ggpht.com/a/AGF-l79yWhq8XPpqNUxzW6rnzB41IRgVuTr6K2PxEQ=s900-c-k-c0xffffffff-no-rj-mo"
        },
        {
            id: 2, name: 'Anna',
            ava: "https://sneg.top/uploads/posts/2023-06/1687586574_sneg-top-p-avatarka-politicheskaya-vkontakte-46.png"
        },
        {
            id: 3, name: 'Lena',
            ava: "https://sneg.top/uploads/posts/2023-06/1687566265_sneg-top-p-avatarka-dlya-shkolnogo-portala-instagram-2.png"
        },
        {
            id: 4, name: 'Misha',
            ava: "https://sneg.top/uploads/posts/2023-06/1688058432_sneg-top-p-avatarka-bota-telegramm-instagram-39.jpg"
        },
        {id: 5, name: 'Ignat', ava: "https://sb.klinok-project.ru/theme/img/profile-pics/2.jpg"}
    ],
    messagesData: [
        {id: 1, text: "Hey", belong: false},
        {id: 2, text: "What's up?", belong: false},
        {id: 3, text: "Everything's fine", belong: true},
        {id: 4, text: "Do you like donuts?", belong: true},
        {id: 5, text: "Of course", belong: false}
    ]
}
test('length of messages data should be increment', () => {
    let action = actions.addMessage("Hello")
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData.length).toBe(6)
})
test('text of new message should be correct', () => {
    let action = actions.addMessage("Hello")
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData[5].text).toBe("Hello")
})
test('after deleting length of messages data should be decrement', () => {
    let action = actions.deleteMessage(2)
    let newState = dialogsReducer(state, action)
    expect(newState.messagesData.length).toBe(4)
})