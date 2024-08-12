import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initialiseApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import {getInitialisedS} from "./redux/appSelectors";
import ProfilePage from "./components/Profile/ProfilePage";
import {Layout} from 'antd';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import React, {Component} from "react";

const DialogsPage = React.lazy(() => import ('./components/Dialogs/DialogsPage'))
const UsersPage = React.lazy(() => import('./components/Users/UsersPage'))
const Login = React.lazy(() => import('./components/Login/Login'))
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))
type PropsTypes = {
    initialiseApp: () => void
    initialised: boolean
}
const {Content, Footer} = Layout
class App extends Component<PropsTypes> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(e.reason.message)
        console.error(e.reason.message)
    }

    componentDidMount() {
        this.props.initialiseApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialised) return <Preloader/>
        return (
            <BrowserRouter>
                <Layout>
                    <Header/>
                    <Content style={{padding: '0 48px'}}>
                        <Layout style={{padding: '24px 0'}}>
                            <Nav/>
                            <Content style={{padding: '0 24px', minHeight: 280}}>
                                <React.Suspense fallback={<Preloader/>}>
                                    <Routes>
                                        <Route path={'/social-network'} element={<Navigate to={'/profile'}/>}/>
                                        <Route path='/profile/:userId?' element={<ProfilePage/>}/>
                                        <Route path='/dialogs/:dialogId?' element={<DialogsPage/>}/>
                                        <Route path='/users' element={<UsersPage/>}/>
                                        <Route path='/news' element={<News/>}/>
                                        <Route path='/music' element={<Music/>}/>
                                        <Route path='/settings' element={<Settings/>}/>
                                        <Route path='/login' element={<Login/>}/>
                                        <Route path='/chat' element={<ChatPage/>}/>
                                        <Route path={'/!*'} element={<div>404 NOT FOUND</div>}/>
                                    </Routes>
                                </React.Suspense>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©{new Date().getFullYear()} Created by Zebra of Love
                    </Footer>
                </Layout>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialised: getInitialisedS(state)
})
const AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initialiseApp})
)(App)
type MainAppPropsType = {store: any}
const MainApp: React.FC<MainAppPropsType> = ({store}) => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}
export default MainApp
