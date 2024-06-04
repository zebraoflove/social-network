import './App.css';
import Nav from './components/Nav/Nav';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, {Component} from "react";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initialiseApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))

class App extends Component {
    componentDidMount() {
        this.props.initialiseApp()
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
                                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                    <Route path='/users' element={<UsersContainer/>}/>
                                    <Route path='/news' element={<News/>}/>
                                    <Route path='/music' element={<Music/>}/>
                                    <Route path='/settings' element={<Settings/>}/>
                                    <Route path='/login' element={<Login/>}/>
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
                </BrowserRouter>
        )
    }
}
const mapStateToProps = (state) => ({
    initialised: state.app.initialised
})
let AppContainer = compose(
    connect(mapStateToProps, {initialiseApp})
)(App)

let MainApp = (props) => {
    return <Provider store={store}>
        <AppContainer/>
    </Provider>
}
export default MainApp
