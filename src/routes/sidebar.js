/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */


let dummy = [
  {
    path: '/app/profile',
    icon: 'OutlinePersonIcon',
    name: 'Profile',
  },
  {
    path: '/app/users',
    icon: 'PeopleIcon',
    name: 'Users',
  },
  {
    path: '/app/billing',
    icon: 'FormsIcon',
    name: 'Billing',
  },
  {
    path: '/app/teams',
    icon: 'PagesIcon',
    name: 'Teams',
  },
  {
    path: '/app/logout',
    icon: 'OutlineLogoutIcon',
    name: 'Logout',
  },
  {},
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/app/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },

]


const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/apps',
    icon: 'AppsIcon',
    name: 'Apps',
  },
  {
    path: '/app/app1/manage-clients',
    icon: 'ClientIcon',
    name: 'Clients',
  },
  // {
  //   path: '/app/app1/manage-admin',
  //   icon: 'OutlinePersonIcon',
  //   name: 'Admin',
  // },

  {
    path: '/app/app1/settings',
    icon: 'OutlineCogIcon',
    name: 'Settings',
    type: "bottom"
  },
  // ...dummy
]

export default routes
