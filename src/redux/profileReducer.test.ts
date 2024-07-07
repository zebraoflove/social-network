import usersReducer, {actions, InitialStateType} from "./profileReducer"
import {ContactsType, PhotosType} from "../Types/types";

let state: InitialStateType
beforeEach(() => {
        state = {
            postsData: [
                {id: 1, message: "Hi, how are you?", likes: 20},
                {id: 2, message: "It's my first post", likes: 5},
                {id: 3, message: "Have a nice day!", likes: 14}
            ],
            userProfile: {
                userId: 5,
                aboutMe: "",
                lookingForAJob: false,
                lookingForAJobDescription: "",
                fullName: "",
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
                photos: {large: null, small: null}
            },
            status: ""
        }
    }
)
test("correctly adding new post", () => {
    const newState = usersReducer(state, actions.addPost("New post"))
    expect(newState.postsData.length).toBe(4)
    expect(newState.postsData[3].message).toBe("New post")
})
test("correctly setting user profile", () => {
    const newState = usersReducer(state, actions.setUserProfile(
        {userId: 15,
        aboutMe: "aboutMe",
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "Jake",
        contacts: {github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: "website.com",
            youtube: null,
            mainLink: null},
        photos: {large: null, small: null}}))
    if(newState.userProfile) {
        expect(newState.userProfile.fullName).toBe("Jake")
        expect(newState.userProfile.aboutMe).toBe("aboutMe")
        expect(newState.userProfile.contacts?.website).toBe("website.com")
    }
})
test("correctly setting user status", () => {
    const newState = usersReducer(state, actions.setStatus("My status"))
    expect(newState.status).toBe("My status")
})
test("correctly setting avatar", () => {
    const newState = usersReducer(state, actions.setAvatar({large: "large.jpg", small: "small.jpg"}))
    expect(newState.userProfile ? newState.userProfile.photos.small : undefined).toBe("small.jpg")
    expect(newState.userProfile ? newState.userProfile.photos.large : undefined).toBe("large.jpg")
})