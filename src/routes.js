import { lazy } from 'react';

const MyDashboard = lazy(() => import('./views/RemoteManagement/NewDrive'));
const Home = lazy(() => import('./views/Home'));
const ShowConfig = lazy(() => import('./views/RemoteManagement/ShowConfig'));
const RemoteExplorerLayout = lazy(() => import("./views/Explorer/RemoteExplorerLayout"));
const Login = lazy(() => import("./views/Pages/Login"));
const RCloneDashboard = lazy(() => import("./views/RCloneDashboard"));
const MountDashboard = lazy(() => import("./views/MountDashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// Define the routes as required
const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/newdrive/edit/:drivePrefix', name: 'Edit Remote', children: MyDashboard},
    {path: '/newdrive', exact: true, name: 'New Remote', children: MyDashboard},
    {path: '/login', exact: true, name: 'Login Page', children: Login},
    {path: '/dashboard', name: 'Dashboard', children: Home},
    {path: '/showconfig', name: 'Configs', children: ShowConfig},
    {path: '/remoteExplorer/:remoteName/:remotePath', exact: true, name: 'Explorer', children: RemoteExplorerLayout},
    {path: '/remoteExplorer', name: 'Explorer', children: RemoteExplorerLayout},
    {path: '/rcloneBackend', name: 'Rclone Backend', children: RCloneDashboard},
    {path: '/mountDashboard', name: 'Mount Dashboard', children: MountDashboard},
];

export default routes;
