import {Link} from "react-router-dom";
import React from "react";
import {Button, Layout, Menu, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthS, getLoginS} from "../../redux/authSelectors";
import {AppDispatchType} from "../../redux/redux-store";
import {logoutUser} from "../../redux/authReducer";

const Header: React.FC = () => {
    const {Header} = Layout
    const login = useSelector(getLoginS)
    const isAuth = useSelector(getIsAuthS)
    const dispatch: AppDispatchType = useDispatch()
    const logout = () => {
        dispatch(logoutUser())
    }
    return <Header style={{display: 'flex', alignItems: 'center'}}>
            <Menu theme="dark" mode="horizontal" style={{width: 'calc(100% - 200px)'}}>
                <Menu.Item key='users'><Link to='/users'>All developers</Link></Menu.Item>
                <Menu.Item key='dialogs'><Link to='/dialogs'>My dialogs</Link></Menu.Item>
                <Menu.Item key='login'>{isAuth ? <div>
                        <Button icon={<UserOutlined />} onClick={logout}>{login}</Button></div>
                    : <Button><Link to={'/login'}>Login</Link></Button>}</Menu.Item>
            </Menu>
    </Header>
}
export default Header