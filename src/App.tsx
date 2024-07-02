import './App.css';
import Nav from './components/Nav/Nav';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Component} from "react";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initialiseApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {getInitialisedS} from "./redux/appSelectors";
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))
type PropsTypes = {
    initialiseApp: () => void
    initialised: boolean
}
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
        if(!this.props.initialised) return <Preloader/>
        return (
                <BrowserRouter>
                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <Nav/>
                        <div className='app-wrapper-content'>
                            <React.Suspense fallback={<Preloader/>}>
                                <Routes>
                                    <Route path={'/social-network'} element={<Navigate to={'/profile'}/>}/>
                                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                    <Route path='/users' element={<UsersContainer/>}/>
                                    <Route path='/news' element={<News/>}/>
                                    <Route path='/music' element={<Music/>}/>
                                    <Route path='/settings' element={<Settings/>}/>
                                    <Route path='/login' element={<Login/>}/>
                                    <Route path={'/*'} element={<div>404 NOT FOUND</div>}/>
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
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

const MainApp = () => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}
export default MainApp
