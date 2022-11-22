import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import UpdateTeamForm from '../components/Forms/UpdateTeamForm'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import TeamUsersTable from '../components/Tables/TeamUsersTable'
import TeamInvitationsTable from '../components/Tables/TeamInvitationsTable'
import LeaveTeamModal from '../components/Modals/LeaveTeamModal'
import UpdateTeamUserModal from '../components/Modals/UpdateTeamUserModal'
import DeleteTeamUserModal from '../components/Modals/DeleteTeamUserModal'
import CreateInvitationModal from '../components/Modals/CreateInvitationModal'
import DeleteInvitationModal from '../components/Modals/DeleteInvitationModal'
import { teamService } from '../services'
import {
  Button
} from '@windmill/react-ui'

function TeamDetails() {
  const { teamId } = useParams()
  const history = useHistory()
  const { user, setUser, logout } = useContext(AuthContext)
  const [team, setTeam] = useState(null)
  const [role, setRole] = useState(false)
  const [activeUser, setActiveUser] = useState(null)
  const [activeInvitation, setActiveInvitation] = useState(null)
  const [error, setError] = useState(null)
  const [showEditTeamForm, setShowEditTeamForm] = useState(false)
  const [showLeaveTeamModal, setShowLeaveTeamModal] = useState(false)
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showCreateInvitationModal, setShowCreateInvitationModal] = useState(false)
  const [showDeleteInvitationModal, setShowDeleteInvitationModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const refreshTeam = useCallback(() => {
    return teamService.getTeam(teamId)
    .then(response => {
      setTeam(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [teamId])

  useEffect(() => {
    refreshTeam()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshTeam])

  useEffect(() => {
    if(team && user) {
      var found = false;
      if(user.teams) {
        for(var i = 0; i < user.teams.length; i++) {
          if (user.teams[i].id === team.id) {
              setRole(user.teams[i].role)
              found = true;
              break;
          }
        }
      }
      if(!found) {
        history.push('/app/teams')
      }
    }
  }, [team, user]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAction = (val, type) => {
    switch(type) {
      case 'leaveTeam' :
        setShowLeaveTeamModal(true)
        break
      case 'updateUser' :
        setActiveUser(val)
        setShowUpdateUserModal(true)
        break
      case 'deleteUser' :
        setActiveUser(val)
        setShowDeleteUserModal(true)
        break
      case 'createInvitation' :
        setShowCreateInvitationModal(true) 
        break
      case 'deleteInvitation' :
        setActiveInvitation(val)
        setShowDeleteInvitationModal(true)
        break
      default:
        setActiveUser(null) 
        break
    }
  }

  const onModalClose = (type) => {
    setActiveUser(null)
    setActiveInvitation(null)
    switch(type) {
      case 'leaveTeam' :
        setShowLeaveTeamModal(false)
        break
      case 'updateUser' :
        setShowUpdateUserModal(false)
        break
      case 'deleteUser' :
        setShowDeleteUserModal(false)
        break
      case 'createInvitation' :
        setShowCreateInvitationModal(false) 
        break
      case 'deleteInvitation' :
        setShowDeleteInvitationModal(false)
        break
      default:
        break
    } 
  }

  const onModalAction = (m_user, m_team, type) => {
    setActiveUser(null)
    setActiveInvitation(null)
    switch(type) {
      case 'leaveTeam' :
        setShowLeaveTeamModal(false)
        setUser(m_user)
        setTeam(m_team)
        break
      case 'updateUser' :
        setShowUpdateUserModal(false)
        if(user.id === m_user.id) {
          setUser(m_user)
        }
        setTeam(m_team)
        break
      case 'deleteUser' :
        setShowDeleteUserModal(false)
        if(user.id === m_user.id) {
          setUser(m_user)
        }
        setTeam(m_team)
        break
      case 'createInvitation' :
        setShowCreateInvitationModal(false) 
        setTeam(m_team)
        break
      case 'deleteInvitation' :
        setShowDeleteInvitationModal(false)
        setTeam(m_team)
        break
      default:
        break
    }
  }

  const updateTeamCallback = (m_user, m_team) => {
    setUser(m_user)
    setTeam(m_team)
    setShowEditTeamForm(false)
  }

  if(!isLoaded) {
    return <ThemedSuspense />
  }

  if(error) {
    if(error.response) {
      switch (error.response.status) {
        case 400:
          logout()
          return <Redirect to='/auth' />
        case 403:
          return <PageError message="Unauthorized : Only team users can view/update team details." />
        case 404:
          return <PageError message="Not Found : No such team found." />
        default: 
          return <PageError message="Some error occured : please try again." />
      }
    } else {
      return <PageError message="Some error occured : please try again." />
    }
  }

  return (
    <>
      <div className="flex flex-col pb-6 sm:pb-0 sm:flex-row justify-between sm:items-center">
        <PageTitle>{team.name}</PageTitle>
        <div className="flex gap-4">
          {role && (role === 'teamOwner' || role === 'teamAdmin') &&
            <Button onClick={(e) => {e.preventDefault(); setShowEditTeamForm(!showEditTeamForm)}}>Edit Team</Button>
          }
          {role && (role === 'teamUser' || role === 'teamAdmin') &&
            <Button layout="outline" onClick={(e) => {e.preventDefault(); handleAction(null, 'leaveTeam')}}>Leave Team</Button>
          }
        </div>
      </div>

      {showEditTeamForm && 
        <>
          <SectionTitle>Edit Team</SectionTitle>
          <UpdateTeamForm team={team} callback={updateTeamCallback}/>
        </>
      }

      <SectionTitle>Team Members</SectionTitle>
      <TeamUsersTable users={team.users} onAction={handleAction} totalResults={team.users.length} resultsPerPage={team.users.length} onPageChange={()=>{}} role={role} />

      <div className="flex flex-wrap justify-between mb-4">
        <SectionTitle>Invitations</SectionTitle>
        {role && (role === 'teamOwner' || role === 'teamAdmin') &&
          <div>
            <Button onClick={(e) => {e.preventDefault(); handleAction(null, 'createInvitation')}}>Invite Users</Button>
          </div>
        }
      </div>

      {!!team.invitations.length && <TeamInvitationsTable invitations={team.invitations} onAction={handleAction} role={role} />}
      {!team.invitations.length && <div className="mb-8"><p>No Invitations Found</p></div>}

      <LeaveTeamModal team={team} isOpen={showLeaveTeamModal} onClose={onModalClose} onAction={onModalAction}/>

      <UpdateTeamUserModal team={team} user={activeUser} isOpen={showUpdateUserModal} onClose={onModalClose} onAction={onModalAction}/>
      <DeleteTeamUserModal team={team} user={activeUser} isOpen={showDeleteUserModal} onClose={onModalClose} onAction={onModalAction}/>

      <CreateInvitationModal team={team} isOpen={showCreateInvitationModal} onClose={onModalClose} onAction={onModalAction}/>
      <DeleteInvitationModal team={team} invitation={activeInvitation} isOpen={showDeleteInvitationModal} onClose={onModalClose} onAction={onModalAction}/>
    </>
  )
}

export default TeamDetails
