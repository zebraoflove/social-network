import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";

let store = {
    _callSubscriber1() {

    },
    subscribe1(observer) {
        this._callSubscriber = observer
    },
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: "Hi, how are you?", likes: 20},
                {id: 2, message: "It's my first post", likes: 5},
                {id: 3, message: "Have a nice day!", likes: 14}
            ],
            newPostText: ""
        },
        dialogsPage: {
            usersData: [
                {
                    id: 1,
                    name: 'Igor',
                    ava: "https://yt3.ggpht.com/a/AGF-l79yWhq8XPpqNUxzW6rnzB41IRgVuTr6K2PxEQ=s900-c-k-c0xffffffff-no-rj-mo"
                },
                {
                    id: 2,
                    name: 'Anna',
                    ava: "https://sneg.top/uploads/posts/2023-06/1687586574_sneg-top-p-avatarka-politicheskaya-vkontakte-46.png"
                },
                {
                    id: 3,
                    name: 'Lena',
                    ava: "https://sneg.top/uploads/posts/2023-06/1687566265_sneg-top-p-avatarka-dlya-shkolnogo-portala-instagram-2.png"
                },
                {
                    id: 4,
                    name: 'Misha',
                    ava: "https://sneg.top/uploads/posts/2023-06/1688058432_sneg-top-p-avatarka-bota-telegramm-instagram-39.jpg"
                },
                {id: 5, name: 'Ignat', ava: "https://focus-msk.ru/image/catalog/123/852682.png"}
            ],
            messagesData: [
                {text: "Hey", belong: false},
                {text: "What's up?", belong: false},
                {text: "Everything's fine", belong: true},
                {text: "Do you like donuts?", belong: true},
                {text: "Of course", belong: false}
            ],
            newMessageText: ""
        },
        usersPage: {
            users: [
                {
                    id: 1,
                    name: "Dmitry K.",
                    location: {country: "Belarus", city: "Minsk"},
                    status: "I like dogs",
                    followed: true,
                    ava: "https://cdn3.imgbb.ru/community/78/781507/8a600ee435e7688092b415282d388ba7.jpg"
                },
                {
                    id: 2,
                    name: "Anna B.",
                    location: {country: "Russia", city: "Moscow"},
                    status: "I am the best in the world!",
                    followed: false,
                    ava: "http://photocasa.ru/uploads/posts/2017-07/1499704521_2.jpg"
                },
                {
                    id: 3,
                    name: "John T.",
                    location: {country: "USA", city: "Toronto"},
                    status: "I am a doctor",
                    followed: false,
                    ava: "https://i.pinimg.com/originals/37/5a/ec/375aec7e73f2699fbd0636b52a5694a1.jpg"
                }
            ]
        }
    },
    get_state1(){
        return this._state
    },
    dispatch1(action) {
        profileReducer(this._state.profilePage, action)
        dialogReducer(this._state.dialogsPage, action)
        this._callSubscriber()
    }
}
export default store