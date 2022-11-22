import React, { useState, useEffect, useContext } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import { OutlinePersonIcon, EditIcon, TrashIcon } from '../icons'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Button,
} from '@windmill/react-ui'

//components
import CustomAvatar from "../components/Avatar"
import AddClient from "../components/ManageClients/AddClient"

//api
import { deleteUserInTeam, getTeamById } from "../api/interview/team"

//context
import { AuthContext } from '../context/AuthContext'
import { GlobalContext } from '../context/GlobalContext'
import { SnackbarContext } from '../context/SnackbarContext'


function ManageClients() {
  //reload
  const [reload, setreload] = useState(1);

  //logged user
  const { user } = useContext(AuthContext);
  let { data: { team }, setData } = useContext(GlobalContext);
  //context
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  //integrate team
  const fetchTeam = async (teamId) => {
    let res = await getTeamById(teamId);
    setData((old) => ({ ...old, team: res.data }));
  };
  const reloadFun = ()=>{
    setreload((old) => old + 1);
  }

  //delete user in team
  const handleDeleteUser = async (userId) => {
    let res = await deleteUserInTeam(user.activeTeam, userId).catch((err) => {
      openSnackbar(err.data.message, "danger");
      setTimeout(() => {
        closeSnackbar();
      }, 3000);
    });
    if (!res?.success) return;

    openSnackbar(`User deleted successfully`, "success");
    setTimeout(() => {
      closeSnackbar();
    }, 3000);

    reloadFun();
  }


  useEffect(() => {
    fetchTeam(user.activeTeam);
  }, [reload]);


  return (
    <>
      <div className='flex items-center justify-between'>
        <PageTitle>Manage Clients</PageTitle>
        <AddClient teamId={user.activeTeam} reload={reloadFun} />
      </div>


      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {team.users?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <CustomAvatar className="hidden mr-3 md:block" color={user.id?.profileColor} name={user.name} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.role}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    {/* <Button layout="link" size="icon" aria-label="Edit">
                      <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit Password">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={()=> handleDeleteUser(user._id)} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ManageClients
