import React from 'react';

const MyDashboard = React.lazy(() => import('./views/NewDrive'));
const Home = React.lazy(() => import('./views/Home'));
const ShowConfig = React.lazy(() => import('./views/ShowConfig'));
const RemoteExplorerLayout = React.lazy(() => import("./views/RemoteExplorerLayout"))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/newdrive', exact: true, name: 'New Drive', component: MyDashboard},
    {path: '/dashboard', name: 'Dashboard', component: Home},
    {path: '/showconfig', name: 'Configs', component: ShowConfig},
    {path: '/remoteExplorer/:remoteName/:remotePath', exact: true, name: 'Explorer', component: RemoteExplorerLayout},
    {path: '/remoteExplorer', name: 'Explorer', component: RemoteExplorerLayout},

];

export default routes;
