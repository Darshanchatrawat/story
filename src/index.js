import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import { SnackbarProvider } from './context/SnackbarContext'
import { AuthProvider } from './context/AuthContext'
import { StripeProvider } from './context/StripeContext'
import { GlobalProvider } from './context/GlobalContext'


import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'

//global
import "./styles/global.css"

ReactDOM.render(
  <SidebarProvider>
    <SnackbarProvider>
      {/* <StripeProvider> */}
        <AuthProvider>
          <GlobalProvider>
            <Suspense fallback={<ThemedSuspense />}>
              <Windmill usePreferences>
                <App />
              </Windmill>
            </Suspense>
          </GlobalProvider>
        </AuthProvider>
      {/* </StripeProvider> */}
    </SnackbarProvider>
  </SidebarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
