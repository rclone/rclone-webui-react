import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import {connect} from "react-redux";
import {PASSWORD_KEY, USER_NAME_KEY} from "../../utils/Constants";
import ErrorBoundary from "../../ErrorHandling/ErrorBoundary";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;


    componentWillMount() {
        if (!localStorage.getItem(USER_NAME_KEY) || !localStorage.getItem(PASSWORD_KEY)) {
            this.props.history.push('/login');
        }
    }

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
                            <Suspense>
                                <AppSidebarNav navConfig={navigation} {...this.props} />
                            </Suspense>
                            <AppSidebarFooter/>
                            <AppSidebarMinimizer/>
                        </AppSidebar>
                        <main className="main">
                            <AppBreadcrumb appRoutes={routes}/>
                            <Container fluid>
                                <Suspense fallback={this.loading()}>
                                    <Switch>
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
                                        <Redirect from="/" to="/login"/>
                                    </Switch>
                                </Suspense>
                            </Container>
                        </main>
                        <AppAside fixed>
                            <Suspense fallback={this.loading()}>
                                <DefaultAside/>
                            </Suspense>
                        </AppAside>
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

const mapStateToProps = (state) => ({
    isConnected: state.status.isConnected,
});

export default connect(mapStateToProps, {})(DefaultLayout);