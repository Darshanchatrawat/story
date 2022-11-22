import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button, HelperText } from '@windmill/react-ui'
import { GoogleIcon } from '../../icons'
import useQuery from '../../utils/useQuery'

function GoogleAuthForm() {
  const query = useQuery()
  const { googleAuth } = useContext(AuthContext)
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit= () => {
    setSubmitting(true)
    googleAuth()
  }

  return (
    <>  
      <Button block layout="outline" className="mt-4" disabled={isSubmitting} onClick={(e) => {e.preventDefault(); onSubmit()}}>
        <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        Google
      </Button>
      {query.get('OAuthRedirect') === 'google' && (
        <HelperText valid={false}>Google Authentication Failed. Please try again.</HelperText>
      )}
    </>
  )
}

export default GoogleAuthForm