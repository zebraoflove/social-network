import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://avatars.mds.yandex.net/i?id=f64b8c100fe0887e2adb35dc30ff773868a6fdab-11543319-images-thumbs&n=13' />
        <div className={s.loginBlock}>
            {props.isAuth ? <div><span>{props.login}</span><button onClick={props.logoutUser}>Log out</button></div> : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>;
}

export default Header;