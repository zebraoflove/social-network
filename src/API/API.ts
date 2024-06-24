import axios from "axios";
import {FollowedType, ProfileInfoType} from "../Types/types";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "254a7f14-a031-481e-aee9-17986eaeac9a"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, isFriend: FollowedType) {
        let friend = null
        if(isFriend === 'Followed') friend = true
        if(isFriend === 'NotFollowed') friend = false
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`)
            .then(response => {
                return response.data
            })
    }
}
export const followAPI = {
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}
export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status/', {status: status})
    },
    updateAvatar(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfileInfo(profile: ProfileInfoType) {
        return instance.put('profile', profile)
    }
}
export const authAPI = {
    authUser() {
        return instance.get(`auth/me`)
    },
    loginUser(email: string, password: string, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logoutUser() {
        return instance.delete('auth/login')
    },
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}