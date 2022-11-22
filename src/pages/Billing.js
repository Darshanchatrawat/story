import React, { useState, useContext, useEffect } from 'react'

import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import BillingForm from '../components/Forms/BillingForm'
import PricingCard from '../components/Cards/PricingCard'
import BillingDetailsCard from '../components/Cards/BillingDetailsCard'
import { SnackbarContext } from '../context/SnackbarContext'
import { AuthContext } from '../context/AuthContext'
import { StripeContext } from '../context/StripeContext'
import { stripeService } from '../services'
import { HelperText } from '@windmill/react-ui'
import { useStripe } from '@stripe/react-stripe-js'

function Products({user, enabled, PricingCardCallback}) {
  const { products } = useContext(StripeContext)

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <PricingCard title="Free" type="free" value="Free plan" active={user.subscription.subscriptionType === 'free'} enabled={enabled} user={user} callback={PricingCardCallback} />
      {products && products.map(function(product, i){
          if(!product.product.active && user.subscription.subscriptionType !== product.product.metadata.type) {return null}
          return <PricingCard key={i} title={product.product.name} type={product.product.metadata.type} value={product.price.currency_symbol + product.price.unit_amount/100 + ' / ' + product.price.recurring.interval} active={user.subscription.subscriptionType === product.product.metadata.type} enabled={enabled} user={user} callback={PricingCardCallback} />
      })}
    </div>
  )
}

function Billing() {
  const stripe = useStripe()
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const { user, setUser } = useContext(AuthContext)
  const [editBillingDetails, setEditBillingDetails] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(enabled) {
      closeSnackbar()
    } else {
      openSnackbar('Updating subscription..')
    }
  }, [enabled, openSnackbar, closeSnackbar])

  const handlePaymentThatRequiresCustomerAction = (subscription) => {
    if(!subscription) {return}
    if (subscription && subscription.status === 'active') {
      return subscription
    }
    const paymentIntent = subscription.latest_invoice.payment_intent
    if (paymentIntent.status === 'requires_action') {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: user.stripePaymentMethod.id,
        })
        .then((result) => {
          if (result.error) {
            throw Object.assign(new Error(result.error.message),{response: {data: {message: result.error.message}}})
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              return subscription
            } else {
              throw Object.assign(new Error('Some error occured'))
            }
          }
        })
        .catch((error) => {
          stripeService.deleteSubscription(subscription.id)
          throw error
        });
    } else {
      return subscription
    }
  }

  const onSubscriptionComplete = (subscription) => {
    if(!subscription) return;
    if (subscription.status === 'active') {
      return stripeService.completeSubscription(subscription.id, subscription.items.data[0].price.product)
    } else {
      throw Object.assign(new Error('Some error occured'))
    }
  }

  const handleSubscription = (type) => {
    setEnabled(false)
    setError(null)
    stripeService.createSubscription(type)
    .then(handlePaymentThatRequiresCustomerAction)
    .then(onSubscriptionComplete)
    .then(() => {
      setUser(user => {
        const newUser = {...user, subscription: {subscriptionType: type}}
        setEnabled(true)
        return newUser
      })
    })
    .catch((error) => {
      if(error.response) setError(error.response.data.message)
      else setError("Some error occured.")
      setEnabled(true)
    })
  }

  const billingFormCallback = (user) => {
    setUser(user)
    setEditBillingDetails(false)
  }

  const BillingDetailsCardCallback = () => {
    setEditBillingDetails(true)
  }

  const PricingCardCallback = (type) => {
    handleSubscription(type)
  }

  if(!user) {
    return <PageError message="Some error occured : please try again." />
  }

  return (
    <>
      <PageTitle>Billing</PageTitle>
      <SectionTitle>Plans</SectionTitle>
      <Products user={user} enabled={enabled} PricingCardCallback={PricingCardCallback}/>
      {error && <HelperText valid={false} className="mb-8 text-sm">{error}</HelperText>}

      <SectionTitle>Billing Details</SectionTitle>
      {(user.stripePaymentMethod && !editBillingDetails) && <BillingDetailsCard user={user} callback={BillingDetailsCardCallback}/>}
      {(!user.stripePaymentMethod || editBillingDetails) && <BillingForm callback={billingFormCallback}/>}
    </>
  )
}

export default Billing
