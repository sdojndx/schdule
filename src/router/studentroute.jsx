import React, {Component, PropTypes} from "react";
import { Router, Route, Redirect, IndexRoute, hashHistory } from "react-router";
import {Provider} from 'react-redux'
import store from '../redux/store'
import {changeNav} from '../redux/action/navs'

const enter =(path)=>{
    store.dispatch(changeNav(path.location.pathname));
}
const RouteConfig = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Index} />//首页
                <Route path="/" component={Index} onEnter={enter}/>
                <Route path="index" component={Index} onEnter={enter}/>
                <Route path="studyyear" component={SecondNav} onEnter={enter}>
                    <IndexRoute component={StudyYear} />
                    <Route path="/" component={StudyYear} />
                    <Route path="termdetail" component={TermDetail} />
                    <Route path="termedit" component={TermEdit} />
                </Route>
            </Route>
        </Router>
    </Provider>
)

export default RouteConfig;