import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import useQuery from '../utils/useQuery'
import { AuthContext } from '../context/AuthContext'
import { teamService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import { HelperText, Button } from '@windmill/react-ui'

function TeamInvitation() {
  const { teamId } = useParams()
  const query = useQuery()
  const history = useHistory()
  const { setUser } = useContext(AuthContext)
  const [teamName, setTeamName] = useState('')
  const [invitation, setInvitation] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isHandled, setHandled] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    teamService.getInvitation(teamId, query.get('invitationId'))
    .then(response => {
      setTeamName(response.data.teamName)
      setInvitation(response.data.invitation)
    })
    .catch(err => {
      setError(err)
    })
    .then(() => {
      setIsLoaded(true)
    })
  }, [teamId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(isHandled) {
      history.push('/app/teams')
    }
  }, [isHandled]) // eslint-disable-line react-hooks/exhaustive-deps

  if(!isLoaded) {
    return <ThemedSuspense />
  }

  const handleInvitaion = (accepted) => {
    setStatus(null)
    setSubmitting(true)
    teamService.handleInvitation(teamId, invitation._id, accepted)
    .then(response => {
      setUser(response.data)
      setHandled(true)
    })
    .catch(error => {
      if(error.response) {
        setStatus(error.response.data.message)
      } else {
        setStatus('Some error occured.')
      }
    })
    .then(() => {
      setSubmitting(false)
    })
  }

  if(error) {
    if(error.response) {
      switch (error.response.status) {
        case  403:
          return <PageError message="Unauthorized : The invitation is meant for a different user. Please log in with the correct email to view the invitation." />
        default: 
          return <PageError message="Invalid invitation : please check the URL try again." />
      }
    } else {
      return <PageError message="Some error occured : please try again." />
    }
  }

  return (
    <>
      <PageTitle>Team Invitation</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <p className="mt-4 text-md">You have been invited to join the team <b>{teamName}</b>. Click on accept to accept the invitation.</p>
        {status && (
          <HelperText valid={false}>{status}</HelperText>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button block onClick={(e) => {e.preventDefault(); handleInvitaion(true)}} disabled={isSubmitting}>
            Accept Invitation
          </Button> 
          <Button layout="outline" block onClick={(e) => {e.preventDefault(); handleInvitaion(false)}} disabled={isSubmitting}>
            Decline Invitation
          </Button> 
        </div>
      </div>
    </>
  )
}

export default TeamInvitation
