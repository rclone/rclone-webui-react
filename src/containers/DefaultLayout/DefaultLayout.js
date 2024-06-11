
import React, { lazy, Suspense } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import {getVersion} from "../../actions/versionActions";
import {connect} from "react-redux";
import navigation from '../../_nav';
import {AUTH_KEY, LOGIN_TOKEN} from "../../utils/Constants";
import {Component} from "react";

const DefaultHeader = lazy(() => import('./DefaultHeader'));
const DefaultFooter = lazy(() => import('./DefaultFooter'));

const VERSION_NAV_ITEM_ATTRS = {
    attributes: { target: '_blank' },
    class: 'mt-auto',
    icon: 'cui-cog',
    url: 'https://rclone.org/changelog',
    variant: 'success'
}

const mapStateToProps = (state) => ({
    isConnected: state.status.isConnected,
    version: state.version,
});
class DefaultLayout extends Component {
    get navConfig() {
        return {
            items: [
                ...navigation.items,
                {
                    name: this.props.version.version,
                    ...VERSION_NAV_ITEM_ATTRS
                }
            ]
        }
    }

    componentDidMount() {
        if (!localStorage.getItem(AUTH_KEY) || window.location.href.indexOf(LOGIN_TOKEN) > 0) {
            this.props.history.push('/login');
        } else {
            this.props.getVersion();
        }
    }

    render() {
        return (
            <div>
                sssss
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader>
                    
                        <DefaultHeader onLogout={e => this.signOut(e)}/>
                    
                </AppHeader>
                <div className="body flex-grow-1 px-3">
                <AppContent />
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter/>
                    </Suspense>
                </AppFooter>
            </div>
            </div>
        )
    }
}

export default DefaultLayout;
//connect(mapStateToProps, { getVersion })(DefaultLayout);

/*import React, {Component, Suspense} from 'react';
import { BrowserRouter as Router, Redirect, Navigate, Route, Routes} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '../../components/index';
// sidebar nav config

// routes config
import routes from '../../routes';


import ErrorBoundary from "../../ErrorHandling/ErrorBoundary";

// const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    

    render() {
        // console.log("isConnected, default layout", this.props.isConnected);
        return (
            <div className="app" data-test="defaultLayout">
                <ErrorBoundary>
                    <AppHeader fixed>
                        <Suspense fallback={this.loading()}>
                            <DefaultHeader onLogout={e => this.signOut(e)}/>
                        </Suspense>
                    </AppHeader>
                    <div className="app-body">
                        <AppSidebar fixed display="lg">
                            <AppSidebarHeader/>
                            <AppSidebarForm/>
                            <Suspense fallback={this.loading()}>
                                <AppSidebarNav navConfig={this.navConfig} />
                            </Suspense>
                            <AppSidebarFooter/>
                            <AppSidebarMinimizer/>
                        </AppSidebar>
                        <main className="main">
                            <AppBreadcrumb appRoutes={routes}/>
                            <Container fluid>
                                <Suspense fallback={this.loading()}>
                                    <Routes>
                                        {
                                            routes.map((route, idx) => {
                                                return route.component ? (
                                                    <Route
                                                        key={idx}
                                                        path={route.path}
                                                        exact={route.exact}
                                                        name={route.name}
                                                        render={props => (
                                                            <route.component {...props} />
                                                        )}/>
                                                ) : (null);
                                            })
                                        }
                                        <Navigate from="/" to="/dashboard"/>
                                    </Routes>
                                </Suspense>
                            </Container>
                        </main>
                    </div>
                    <AppFooter>
                        <Suspense fallback={this.loading()}>
                            <DefaultFooter/>
                        </Suspense>
                    </AppFooter>
                </ErrorBoundary>
            </div>
        );
    }
}

export default connect(mapStateToProps, { getVersion })(DefaultLayout);*/
