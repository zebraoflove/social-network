import s from './Navbar.module.css';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import React from "react";

const Navbar = () => {
    const {Sider} = Layout
    return <Sider width={200}>
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{height: '100%'}}
        >
            <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile">
                <Menu.Item key="1">
                    <Link to={'/profile'}>My profile</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined/>} title="Developers">
                <Menu.Item key="2">
                    <Link to={'/users'}>All developers</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={'/dialogs'}>My dialogs</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={'/chat'}>Chat</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
    /*<nav className={s.navbar}>
        <div className={s.item}>
            <NavLink to={"/profile"} className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/dialogs"} className={navData => navData.isActive ? s.active : s.item}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/users"} className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/news"} className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/music"} className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/settings"} className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
        </div>
    </nav>*/
}

export default Navbar;