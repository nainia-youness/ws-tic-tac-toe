import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';

function PrivateRoute(props) {
    
    return (
        <Route path={props.path} render={() => (localStorage.getItem('user_id') ? <props.component client={props.ws} wsConnectionError={props.wsConnectionError}/> : <PageNotFound/>)}/>
    )
}

export default PrivateRoute
