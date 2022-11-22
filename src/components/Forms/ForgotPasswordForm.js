import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'

import { Label, Input, HelperText, Button } from '@windmill/react-ui'

function ForgotPasswordForm() {
  const { forgotPassword } = useContext(AuthContext)
  const [saved, setSaved] = useState(false)

  if(saved) {
    return (
      <p className="text-sm font-medium text-gray-600">
        We've emailed you instructions on how to reset your password. If you don't see it, don't forget to check your spam folder.
      </p>
    )
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
      })}
      onSubmit={({ email }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        forgotPassword(email)
        .then(response => {
          setSubmitting(false)
          setSaved(true)
        })
        .catch(error => {
          if(error.response) {
            setStatus(error.response.data.message)
          } else {
            setStatus('Some error occured. Please try again.')
          }
          setSubmitting(false)
        })
      }}
    >  
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label>
            <span>Email</span>
            <Field className="mt-1" as={Input} name="email" type="email" placeholder="john@doe.com" />
            <ErrorMessage name="email">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            
          </Label>

          <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
            Recover password
          </Button>
          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default ForgotPasswordForm