import React, {useState, useRef} from "react"
import SimpleModal from './SimpleModal.js'
import CreateInvitationForm from '../Forms/CreateInvitationForm'
export default function CreateInvitationModal({team, isOpen, onClose, onAction}) {
  const [enabled, setEnabled] = useState(true)
  const formRef = useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('createInvitation')
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
    if(val) onAction(null, val, 'createInvitation')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Invite User"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<CreateInvitationForm team={team} formRef={formRef} callback={formSubmitCallback} />} />
  );
}