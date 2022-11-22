import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { SnackbarContext } from '../context/SnackbarContext'
import CreateTeamForm from '../components/Forms/CreateTeamForm'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import TeamTable from '../components/Tables/TeamTable'
import DeleteTeamModal from '../components/Modals/DeleteTeamModal'
import { teamService } from '../services'
import {
  Button
} from '@windmill/react-ui'

function Teams() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const { user, setUser } = useContext(AuthContext)
  const [activeTeam, setActiveTeam] = useState(null)
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleAction = (team, type) => {
    setActiveTeam(team)
    switch(type) {
      case 'activeTeam':
        openSnackbar('Updating active team..')
        teamService.setActiveTeam(team.id)
        .then(response => {
          setUser(response.data)
          closeSnackbar()
        })
        .catch(err => {
          closeSnackbar()
        })
        break
      case 'deleteTeam':
        setShowDeleteModal(true) 
        break
      default:
        break
    }
  }

  const onModalClose = (type) => {
    setActiveTeam(null)
    switch(type) {
      case 'deleteTeam':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (m_user, type) => {
    setActiveTeam(null)
    setUser(m_user)
    switch(type) {
      case 'deleteTeam':
        setShowDeleteModal(false) 
        break
      default:
        break
    }
  }

  const createTeamCallback = (m_user) => {
    setUser(m_user)
    setShowCreateTeamForm(false)
  }

  return (
    <>
      <div className="flex flex-col pb-6 sm:pb-0 sm:flex-row justify-between sm:items-center">
        <PageTitle>Teams</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); setShowCreateTeamForm(!showCreateTeamForm)}}>Create Team</Button>
      </div>

      {showCreateTeamForm && 
        <>
          <SectionTitle>Create Team</SectionTitle>
          <CreateTeamForm callback={createTeamCallback}/>
        </>
      }

      <SectionTitle>Your Teams</SectionTitle>

      {(user.teams && !!user.teams.length) && <TeamTable user={user} onAction={handleAction} />}
      {(!user.teams || !user.teams.length) && <p>No Teams Found</p>}

      <DeleteTeamModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} team={activeTeam}/>
    </>
  )
}

export default Teams
