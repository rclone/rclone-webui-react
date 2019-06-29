import React from 'react';

const MyDashboard = React.lazy(() => import('./views/RemoteManagement/NewDrive'));
const Home = React.lazy(() => import('./views/Home'));
const ShowConfig = React.lazy(() => import('./views/RemoteManagement/ShowConfig'));
const RemoteExplorerLayout = React.lazy(() => import("./views/Explorer/RemoteExplorerLayout"));
const Login = React.lazy(() => import("./views/Pages/Login"));
const RCloneDashboard = React.lazy(() => import("./views/RCloneDashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// Define the routes as required
const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/newdrive/edit/:drivePrefix', name: 'New Drive', component: MyDashboard},
    {path: '/newdrive', exact: true, name: 'New Drive', component: MyDashboard},
    {path: '/login', exact: true, name: 'New Drive', component: Login},
    {path: '/dashboard', name: 'Dashboard', component: Home},
    {path: '/showconfig', name: 'Configs', component: ShowConfig},
    {path: '/remoteExplorer/:remoteName/:remotePath', exact: true, name: 'Explorer', component: RemoteExplorerLayout},
    {path: '/remoteExplorer', name: 'Explorer', component: RemoteExplorerLayout},
    {path: '/rcloneBackend', name: 'Rclone Backend', component: RCloneDashboard},

];

export default routes;
