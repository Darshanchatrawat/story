import React from "react"
import SimpleModal from "./SimpleModal.js"
import UpdatePasswordForm from '../Forms/UpdatePasswordForm'

export default function UpdatePasswordModal({isOpen, onClose, onAction, m_user}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('updatePassword')
  }

  const handleModalAction = () => {
    if (formRef.current) {
      formRef.current.validateForm()
      .then(() => {
        setEnabled(!formRef.current.isValid)
        formRef.current.handleSubmit()
      })
    }
  }

  const formSubmitCallback = (val) => {
    setEnabled(true)
    if(val) onAction('updatePassword')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Update Password"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<UpdatePasswordForm formRef={formRef} callback={formSubmitCallback} m_user={m_user} />} />
  );
}