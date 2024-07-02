import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
export const withRouter = (WrappedComponent: React.ComponentType) => (props: any) => {
        const match = {
            params: useParams(),
            location: useLocation(),
            navigate: useNavigate()}
        return <WrappedComponent {...props} match={match}/>
    }