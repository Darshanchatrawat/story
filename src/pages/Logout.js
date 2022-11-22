import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import ThemedSuspense from '../components/ThemedSuspense'

function Logout() {
  const { logout } = useContext(AuthContext)

  React.useEffect(() => {
	  logout()
	}, [logout])

	return <ThemedSuspense />
}

export default Logout
