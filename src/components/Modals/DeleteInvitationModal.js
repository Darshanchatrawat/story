import React, {useState} from "react"
import SimpleModal from "./SimpleModal.js"
import { teamService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeleteInvitationModal({isOpen, onClose, onAction, team, invitation}) {
  const [error, setError] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deleteInvitation')
  }

  const handleModalAction = () => {
    setEnabled(false)
    teamService.deleteInvitation(team.id, invitation._id)
    .then((response) => {
      setEnabled(true)
      setError(null)
      onAction(null, response.data, 'deleteInvitation')
    })
    .catch(err => {
      setEnabled(true)
      if(err.response) {
        setError(err.response.data.message);
      } else {
        setError('Some error occured.');
      }
    })
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Delete Invitation"
      neg_text="Cancel" 
      pos_text="Delete Invitation"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to delete this invitation?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}