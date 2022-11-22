import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'

const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  const { toggleSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])

  return (
    <div
      className={`flex min-h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'} justify-center`}
    >
    
      <Sidebar />

      <div className="flex flex-col flex-1 content-container">
        {/* <Header /> */}
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>

      <style jsx>{`
        .content-container{
          width: 100%;
          max-width: 1200px;
          margin-left: 360px;
        }
        @media screen and (max-width: 1024px) {
          .content-container {
           margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout