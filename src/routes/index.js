import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Logout = lazy(() => import('../pages/Logout'))
const Profile = lazy(() => import('../pages/Profile'))
const Users = lazy(() => import('../pages/Users'))
const Billing = lazy(() => import('../pages/Billing'))
const Teams = lazy(() => import('../pages/Teams'))
const TeamDetails = lazy(() => import('../pages/TeamDetails'))
const TeamInvitation = lazy(() => import('../pages/TeamInvitation'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

//apps
const App1 = lazy(() => import('../pages/apps/interview'));
const Apps = lazy(() => import('../pages/apps'));

const ManageClients = lazy(() => import('../pages/manage-clients'))
const ManageAdmin = lazy(() => import('../pages/manage-admin'))


/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/interview",
    component: App1,
  },
  {
    path: "/apps",
    component: Apps,
  },
  {
    path: "/app1/manage-clients",
    component: ManageClients,
  },
  {
    path: "/app1/manage-admin",
    component: ManageAdmin,
  },


  

  
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/billing',
    component: Billing,
  },
  {
    path: '/teams',
    component: Teams,
  },
  {
    path: '/teams/:teamId',
    component: TeamDetails,
  },
  {
    path: '/team-invitation/:teamId',
    component: TeamInvitation,
  },
  {
    path: '/logout',
    component: Logout,
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
