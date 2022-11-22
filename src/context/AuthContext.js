import React, { useState, useMemo, useEffect, useCallback } from 'react'
import moment from 'moment'
import axios from 'axios'
import { config } from '../assets/config/config'
import ThemedSuspense from '../components/ThemedSuspense'

const apiUrl = config.api.url

// create context
export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null);

  const refreshTokens = useCallback(
    () => {
      return axios.post(`${apiUrl}/v1/auth/refresh-tokens`, {})
        .then(response => {
          setAccessToken(response.data.token)
          setUser(response.data.user)

          localStorage.setItem('refreshToken', response.data.token?.token || "");
          return response
        })
        .catch(error => {
          setUser(null)
          setAccessToken(null)
          return error
        })
    },
    []
  )

  const startSilentRefresh = useCallback(
    () => {
      if (accessToken) {
        const tokenExpires = moment(accessToken.expires)
        const tokenMaxAge = tokenExpires.diff(moment().add(1, 'minutes'))
        setTimeout(() => {
          refreshTokens()
        }, tokenMaxAge)
      }
    },
    [accessToken, refreshTokens]
  )

  const syncLogout = (event) => {
    if (event.key === 'logout') {
      setAccessToken(null)
      setUser(null)
    }
  }

  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      config => {
        config.withCredentials = true
        config.credentials = 'include'
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken.token}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.request.eject(interceptorId);
    }
  }, [accessToken])

  useEffect(() => {
    refreshTokens()
      .then(response => {
        setLoaded(true)
      })
  }, [refreshTokens])

  useEffect(() => {
    startSilentRefresh()
  }, [accessToken, startSilentRefresh])

  useEffect(() => {
    window.addEventListener('storage', syncLogout)
    return function cleanup() {
      window.removeEventListener('storage', syncLogout)
    }
  }, [])

  const value = useMemo(
    () => {
      const register = (username, email, password) => {
        return axios.post(`${apiUrl}/v1/auth/register`, {
          name: username,
          email: email,
          password: password,
          // Need to make this dynamic 
        })
          .then(response => {
            setAccessToken(response.data.token)
            setUser(response.data.user)
            startSilentRefresh()
          })
      }

      const login = (email, password) => {
        return axios.post(`${apiUrl}/v1/auth/login`, {
          email: email,
          password: password
        })
          .then(response => {
            setAccessToken(response.data.token)
            setUser(response.data.user)
            // localStorage.setItem('refreshToken', response.data.token?.token || "");
            window.location.reload();
            startSilentRefresh()
          })
      }

      const githubAuth = () => {
        window.location.href = `${apiUrl}/v1/auth/github`;
      }

      const googleAuth = () => {
        window.location.href = `${apiUrl}/v1/auth/google`;
      }

      const logout = () => {
        setAccessToken(null)
        setUser(null)
        return axios.post(`${apiUrl}/v1/auth/logout`, {})
          .then(response => {
            window.localStorage.setItem('logout', moment())
          })
          .catch(err => { })
      }

      const forgotPassword = (email) => {
        return axios.post(`${apiUrl}/v1/auth/forgot-password`, {
          email: email
        })
      }

      const resetPassword = (password, resetToken) => {
        return axios.post(`${apiUrl}/v1/auth/reset-password?token=${resetToken}`, {
          password: password
        })
      }

      const verifyEmail = (emailVerificationToken) => {
        return axios.post(`${apiUrl}/v1/auth/verify-email?token=${emailVerificationToken}`, {})
      }

      return ({
        user,
        setUser,
        register,
        login,
        githubAuth,
        googleAuth,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail
      })
    },
    [user, startSilentRefresh]
  )

  if (!isLoaded) {
    return <ThemedSuspense />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
