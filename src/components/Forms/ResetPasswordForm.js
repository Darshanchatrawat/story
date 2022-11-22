import React, { useContext } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import useQuery from '../../utils/useQuery'

function ResetPasswordForm() {
  const { resetPassword } = useContext(AuthContext)
  const [saved, setSaved] = React.useState(false)
  const query = useQuery()

  if(saved) {
    return (
      <p className="text-sm font-medium text-gray-600">
        Your password has been reset. Please login using your new password.
      </p>
    )
  }

  return (
    <Formik
      initialValues={{
        password: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required('Password is required'),
      })}
      onSubmit={({ password }, { setStatus, setSubmitting }) => {
        setSubmitting(true)
        setStatus()
        resetPassword(password, query.get("token") ? query.get("token") : "")
        .then(response => {
          setSaved(true)
          setSubmitting(false)
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
            <span>Password</span>
            <Field className="mt-1" as={Input} name="password" type="password" placeholder="***************" />
            <ErrorMessage name="password">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            
          </Label>

          <Button className="mt-4" block type="submit" value="submit" disabled={isSubmitting}>
            Reset password
          </Button>
          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default ResetPasswordForm