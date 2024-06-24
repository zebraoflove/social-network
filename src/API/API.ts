import axios from "axios";
import {FollowedType, PhotosType, ProfileInfoType, ProfileType, UserType} from "../Types/types";
const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "254a7f14-a031-481e-aee9-17986eaeac9a"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10
}
type StandardResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, isFriend: FollowedType) {
        let friend = null
        if(isFriend === 'Followed') friend = true
        if(isFriend === 'NotFollowed') friend = false
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`)
            .then(res =>  res.data)
    }
}
export const followAPI = {
    followUser(userId: number) {
        return instance.post<StandardResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<StandardResponseType>(`follow/${userId}`).then(res => res.data)
    }
}
type UpdateAvatarResponseType = {
    data: { photos: PhotosType }
    fieldsErrors: Array<string>
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<StandardResponseType>('profile/status/', {status: status})
            .then(res => res.data)
    },
    updateAvatar(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<UpdateAvatarResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfileInfo(profile: ProfileInfoType) {
        return instance.put<StandardResponseType>('profile', profile)
            .then(res => res.data)
    }
}
export type AuthUserResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginUserResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeWithCaptcha
    messages: Array<string>
}
type CaptchaResponseType = {
    url: string
}
export const authAPI = {
    authUser() {
        return instance.get<AuthUserResponseType>(`auth/me`).then(res => res.data)
    },
    loginUser(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginUserResponseType>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data)
    },
    logoutUser() {
        return instance.delete<StandardResponseType>('auth/login').then(res => res.data)
    },
    getCaptcha() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then(res => res.data)
    }
}