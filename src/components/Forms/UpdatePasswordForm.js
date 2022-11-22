import React, { useState } from 'react'
import { Input, Label, HelperText, Button } from '@windmill/react-ui'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userService } from '../../services'
import Loader from '../Loader'

function UpdatePasswordForm({ formRef, callback, m_user }) {
  const [saved, setSaved] = useState(false)

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        password: ''
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required('Password is required'),
      })}
      onSubmit={({ password }, { setStatus, setSubmitting }) => {
        setSaved(false)
        setStatus()
        userService.updateUserPassword(m_user.id, password)
          .then(
            result => {
              setSaved(true)
              setSubmitting(false)
              if (callback) callback(result.data)
            },
            error => {
              setSubmitting(false);
              if (error.response) {
                setStatus(error.response.data.message)
              } else {
                setStatus("Some error occured.")
              }
              if (callback) callback(null)
            }
          )
      }}
    >
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label className="mt-4">
            <span>Password</span>
            <Field className="mt-1" as={Input} name="password" type="password" placeholder="***************" />
            <ErrorMessage name="password">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          {!formRef &&
            // <Button className="mt-6" block type="submit" value="submit" disabled={isSubmitting}>
            //   Save Password
            // </Button> 
            <Button className=" w-max bg-primary mt-5 mr-5" type="submit" value="submit" ><Loader hidden={!isSubmitting} />
              Save Password
            </Button>
          }

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}

          {saved && (
            <HelperText valid={true}>Saved!</HelperText>
          )}

        </Form>
      )}
    </Formik>
  );
}

export default UpdatePasswordForm