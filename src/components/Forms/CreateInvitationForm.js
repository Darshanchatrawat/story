import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { teamService } from "../../services"
import { Input, Label, Select, HelperText } from '@windmill/react-ui'

function CreateInvitationForm({team, formRef, callback}) {
  return (
    <div className="bg-white dark:bg-gray-800">
      <Formik
        innerRef={formRef}
        initialValues={{
          email: '',
          role: 'teamUser'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Email is required'),
          role: Yup.string().required('Role is required'),
        })}
        onSubmit={({ email, role }, { setStatus, setSubmitting }) => {
          setStatus();
          setTimeout(async () => {
            await teamService.createInvitation(team.id, email, role)
              .then(
                response => {
                  callback(response.data);
                },
                error => {
                  if(error.response) {
                    setStatus(error.response.data.message);
                  } else {
                    setStatus('Some error occured.');
                  }
                  callback(false);
                }
              );
          }, 400);
        }}
      >  
        {({ errors, status, touched, isSubmitting }) => (
          <Form>
            <Label>
              <span>Email</span>
              <Field className="mt-1" as={Input} name="email" type="email" placeholder="john@doe.com" />
              <ErrorMessage name="email">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            </Label>

            <Label className="mt-4">
              <span>Role</span>
              <Field className="mt-1" as={Select} name="role">
                <option value="teamUser">User</option>
                <option value="teamAdmin">Admin</option>
              </Field>
            </Label>

            {status && (
              <HelperText valid={false}>{status}</HelperText>
            )}
            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateInvitationForm