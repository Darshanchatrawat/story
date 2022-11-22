import React, { useContext } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import UpdateUserForm from '../components/Forms/UpdateUserForm'
import UpdatePasswordForm from '../components/Forms/UpdatePasswordForm'
import { AuthContext } from '../context/AuthContext'

//components
import HeaderCard from "../components/HeaderCard"

function Profile() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <div className="mt-5"></div>
      <HeaderCard  title={"Profile"} desc={"Create lists of interview questions and answers based on a job title and the type of questions and interview you are looking for."} />
      <div className="mb-10"></div>
      
      <SectionTitle>Account Details</SectionTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <UpdateUserForm m_user={user}/>
      </div>

      <SectionTitle>Password</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <UpdatePasswordForm m_user={user}/>
      </div>
    </>
  )
}

export default Profile
