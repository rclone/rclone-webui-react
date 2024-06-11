import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorHandling/ErrorBoundary";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)
// => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = lazy(() => import('./views/Pages/Login'));
const Register = lazy(() => import('./views/Pages/Register'));
const Page404 = lazy(() => import('./views/Pages/Page404'));
const Page500 = lazy(() => import('./views/Pages/Page500'));

class App extends Component {
    render() {
        return (
            <div data-test="appComponent">
                <ErrorBoundary>
                    <ToastContainer/>
                    <Router>
                            <Routes>
                                <Route path="/" name="Home" children={props => <DefaultLayout {...props}/>}/>
                                <Route exact path="/login" name="Login Page" children={props => <Login {...props}/>}/>
                                <Route exact path="/register" name="Register Page" children={props => <Register {...props}/>}/>
                                <Route exact path="/404" name="Page 404" children={props => <Page404 {...props}/>}/>
                                <Route exact path="/500" name="Page 500" children={props => <Page500 {...props}/>}/>
                                {/*<Route path="*" children={props => <Page404 {...props}/>}/>*/}
                            </Routes>
                    </Router>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
