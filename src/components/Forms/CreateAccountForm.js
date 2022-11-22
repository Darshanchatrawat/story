import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext'
import { Input, Label, HelperText, Button, Select } from '@windmill/react-ui'

function CreateAccountForm() {
  const { register } = useContext(AuthContext)
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        // customCheckLogin: false
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required('Password is required'),
        isOwner: Yup.string(),
        orgName: Yup.string(),
        // customCheckLogin: Yup.boolean().oneOf([true], 'Must agree Privacy Policy'),
      })}
      onSubmit={({ username, email, password }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        register(username, email, password)
          .catch(error => {
            if (error.response) {
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
          <div className="flex justify-between gap-5">
            <Label>
              <span>First name</span>
              <Field className="mt-1" as={Input} name="username" type="text" />
              <ErrorMessage name="username">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            </Label>
            <Label>
              <span>Last name</span>
              <Field className="mt-1" as={Input} name="last_name" type="text" />
              <ErrorMessage name="last_name">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            </Label>
          </div>

          <Label className="mt-4">
            <span>Email</span>
            <Field as={Input} name="email" type="email" className="mt-1 block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
            <ErrorMessage name="email">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          <Label className="mt-4">
            <span>Password</span>
            <Field as={Input} name="password" type="password" className="mt-1 block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" />
            <ErrorMessage name="password">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          <Label className="mt-5 mb-5">
            <span>How did you hear about us?</span>
            <Select className="mt-1">
              <option></option>
              <option>Referral</option>
              <option>Facebook</option>
              <option>Google</option>
              <option>Other</option>
            </Select>
          </Label>
          {/* 
          <Label className="mt-6 flex flex-col" check>
            <div className="flex flex-none items-center">
              <Field as={Input} name="customCheckLogin" type="checkbox" />
              <div className="ml-2">
                I agree to the <span className="underline">privacy policy</span>
              </div>
            </div>
            <ErrorMessage name="customCheckLogin">{msg =>
              <div className="flex flex-none items-center w-full">
                <HelperText valid={false}>{msg}</HelperText>
              </div>}
            </ErrorMessage>
          </Label> */}

          {/* <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
            Create Account
          </Button> */}

          <Button block type="submit" value="submit" disabled={isSubmitting} style={{ background: "rgba(28, 100, 242, var(--tw-text-opacity))" }} class="w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-gray-100 hover:bg-blue-700"> Sign up <span aria-hidden="true" class="pl-2">→</span></Button>
          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}

        </Form>
      )}
    </Formik>
  )
}

export default CreateAccountForm