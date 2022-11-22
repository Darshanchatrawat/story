import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button, HelperText } from '@windmill/react-ui'
import { GithubIcon } from '../../icons'
import useQuery from '../../utils/useQuery'

function GithubAuthForm() {
  const query = useQuery()
  const { githubAuth } = useContext(AuthContext)
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit= () => {
    setSubmitting(true)
    githubAuth()
  }

  return (
    <>  
      <Button block layout="outline" disabled={isSubmitting} onClick={(e) => {e.preventDefault(); onSubmit()}}>
        <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        Github
      </Button>
      {query.get('OAuthRedirect') === 'github' && (
        <HelperText valid={false}>Github Authentication Failed. Please try again.</HelperText>
      )}
    </>
  )
}

export default GithubAuthForm