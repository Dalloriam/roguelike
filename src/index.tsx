import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import Layout from "./pages/layout";
import Home from "./pages/home";

const root = document.getElementById("root");

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Home}>
            </IndexRoute>
        </Route>
    </Router>, 
    root);
