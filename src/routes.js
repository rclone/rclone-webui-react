import React from 'react';


const MyDashboard = React.lazy(() => import('./views/NewDrive'));
const Home = React.lazy(() => import('./views/Home'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    {path: '/', exact: true, name: 'Home'},
    {path: '/newdrive', exact: true, name: 'New Drive', component: MyDashboard},
    {path: '/home', name: 'Home', component: Home},

];

export default routes;
