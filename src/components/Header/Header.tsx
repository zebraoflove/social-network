import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import React from "react";
type PropsType = {
    login: string | null
    logoutUser: ()=>(void)
    isAuth: boolean
}
const Header: React.FC<PropsType> = ({login, logoutUser, isAuth}) => {
    return <header className={s.header}>
        <img src='https://avatars.mds.yandex.net/i?id=f64b8c100fe0887e2adb35dc30ff773868a6fdab-11543319-images-thumbs&n=13' />
        <div className={s.loginBlock}>
            {isAuth ? <div><span>{login}</span><button onClick={logoutUser}>Log out</button></div> : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>;
}
export default Header;