import React, { useState, useMemo, useEffect, useCallback } from 'react'
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { config } from '../assets/config/config'
import ThemedSuspense from '../components/ThemedSuspense'

const apiUrl = config.api.url

// create context
export const StripeContext = React.createContext()

export const StripeProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false)
  const [products, setProducts] = useState([])
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    setStripePromise(loadStripe(config.stripe.publicKey))
  }, [])

  const loadProducts = useCallback(
    () => {
      axios.post(`${apiUrl}/v1/stripe/get-products`, {})
      .then(response => {
        setLoaded(true)
        setProducts(response.data.products)
      })
      .catch(err => {
        setLoaded(true)
      })
    }, []
  )

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const value = useMemo(
    () => {
      return ({
        products,
      })
    },
    [products]
  )

  if(!isLoaded) {
      return <ThemedSuspense />
  }

  return (
    <StripeContext.Provider value={value}>
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  )
}
