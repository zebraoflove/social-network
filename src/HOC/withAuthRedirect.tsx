import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {getIsAuthS} from "../redux/authSelectors";
let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: getIsAuthS(state)
})
type MapsPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}
export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapsPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to='/login'/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<MapsPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent)
}