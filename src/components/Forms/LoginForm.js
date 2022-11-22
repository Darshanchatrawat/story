import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'

import { Label, Input, HelperText, Button } from '@windmill/react-ui'

function LoginForm() {
  const { login } = useContext(AuthContext)
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={({ email,  password }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        login(email, password)
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
            <span>Email address</span>
            <Field as={Input} name="email" type="email"  className="mt-1 block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"  />
            <ErrorMessage name="email">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>
          <Label className="mt-4">
            <span>Password</span>
            <Field as={Input} name="password" type="password" className="mt-1 block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"  />
            <ErrorMessage name="password">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          {/* <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
            Log in
          </Button> */}
          <Button block type="submit" value="submit" disabled={isSubmitting} style={{background: "var(--primary-color)"}} className="mt-4 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-700"> Sign in <span aria-hidden="true" className="pl-2">→</span></Button>

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm