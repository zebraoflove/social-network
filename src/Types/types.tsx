export type PostType = {id: number, message: string, likes: number}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {small: string | null, large: string | null}
export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type ProfileInfoType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    contacts: ContactsType
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type MessageType = {id: number, text: string, belong: boolean}
export type TalkerType = {id: number, name: string, ava: string}
export type FollowedType = "All" | "Followed" | "NotFollowed"