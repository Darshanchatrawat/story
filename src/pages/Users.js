import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Redirect } from 'react-router-dom'

import { SnackbarContext } from '../context/SnackbarContext'
import { AuthContext } from '../context/AuthContext'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import UserTable from '../components/Tables/UserTable'
import CreateUserModal from '../components/Modals/CreateUserModal'
import UpdateUserModal from '../components/Modals/UpdateUserModal'
import UpdatePasswordModal from '../components/Modals/UpdatePasswordModal'
import DeleteUserModal from '../components/Modals/DeleteUserModal'
import {
  Button
} from '@windmill/react-ui'
import { config } from '../assets/config/config'
import { userService } from '../services'

function Users() {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const { logout } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false)
  const [activeUser, setActiveUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState(null)
  const [resfreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if(resfreshing) {
      openSnackbar('Refresing users..')
    } else {
      closeSnackbar()
    }
  }, [resfreshing, openSnackbar, closeSnackbar])

  const refreshUsers = useCallback(() => {
    setRefreshing(true)
    return userService.getUsers(currentPage)
    .then(data => {
      setRefreshing(false)
      setUsers(data.results)
      setTotalResults(data.totalResults)
      return null
    })
    .catch(err => {
      setRefreshing(false)
      setError(err)
      return null
    })
  }, [currentPage])

  useEffect(() => {
    refreshUsers()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshUsers])

  const handleAction = (user, type) => {
    setActiveUser(user)
    switch(type) {
      case 'createUser' :
        setShowCreateModal(true) 
        break
      case 'updateUser' :
        setShowUpdateModal(true) 
        break
      case 'updatePassword':
        setShowUpdatePasswordModal(true) 
        break
      case 'deleteUser':
        setShowDeleteModal(true) 
        break
      default:
        setActiveUser(null) 
        break
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActiveUser(null)
    switch(type) {
      case 'createUser' :
        setShowCreateModal(false) 
        break
      case 'updateUser' :
        setShowUpdateModal(false) 
        break
      case 'updatePassword':
        setShowUpdatePasswordModal(false) 
        break
      case 'deleteUser':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveUser(null)
    switch(type) {
      case 'createUser' :
        setShowCreateModal(false) 
        refreshUsers() 
        break
      case 'updateUser' :
        setShowUpdateModal(false) 
        refreshUsers() 
        break
      case 'updatePassword':
        setShowUpdatePasswordModal(false) 
        break
      case 'deleteUser':
        setShowDeleteModal(false) 
        refreshUsers()
        break
      default:
        break
    }
  }

  if(!isLoaded) {
    return <ThemedSuspense />
  }

  if(error) {
    if(error.response) {
      switch (error.response.status) {
        case 401:
          logout()
          return <Redirect to='/auth' />
        case  403:
          return <PageError message="Unauthorized : Only admin can view/update all users." />
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
        <PageTitle>All Users</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); handleAction(null, 'createUser')}}>Create User</Button>
      </div>
      <UserTable users={users} resultsPerPage={config.users.resultsPerPage} totalResults={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <CreateUserModal isOpen={showCreateModal} onClose={onModalClose} onAction={onModalAction}/>
      <UpdateUserModal isOpen={showUpdateModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser}/>
      <UpdatePasswordModal isOpen={showUpdatePasswordModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser}/>
      <DeleteUserModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} m_user={activeUser}/>
    </>
  )
}

export default Users
