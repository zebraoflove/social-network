import s from './Nav.module.css';
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Nav = () => {
    return <nav className={s.navbar}>
        <Navbar/>
        <Sidebar/>
    </nav>
}

export default Nav;