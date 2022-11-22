import React, { useState, useEffect } from 'react'

import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, OutlinePersonIcon, EditIcon, TrashIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input
} from '@windmill/react-ui'


function ManageAdmins() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((item, index) => ({ ...item, email: "email@example.com", phone: 9123456789, sales: index + 1 * index, contacts: index + 1 })))
  }, [page])

  const [addAdminModal, setaddAdminModal] = useState({
    open: false
  })

  const AddAdmin = () => {
    return <Modal isOpen={addAdminModal.open} onClose={() => setaddAdminModal((old) => ({ ...old, open: false }))}>
      <ModalHeader>Add Admin</ModalHeader>
      <ModalBody>
        <Label className='mt-5'>
          <span>Name</span>
          <Input className="mt-1" placeholder="Jane Doe" />
        </Label>
        <Label className='mt-5'>
          <span>Email</span>
          <Input className="mt-1" placeholder="email@example.com" />
        </Label>
        <Label className='mt-5'>
          <span>Phone</span>
          <Input className="mt-1" placeholder="1234567890" />
        </Label>
      </ModalBody>

      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={() => setaddAdminModal((old) => ({ ...old, open: false }))}>
            Cancel
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button>Create</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={() => setaddAdminModal((old) => ({ ...old, open: false }))}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large">
            Accept
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <PageTitle>Manage Admin</PageTitle>
        <Button onClick={() => setaddAdminModal((old) => ({ ...old, open: true }))} style={{ background: 'rgba(14, 159, 110, var(--tw-text-opacity))' }} >Add Admin</Button>
      </div>


      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell>Create On</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.sales}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.contacts}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit Password">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter className='mt-10'>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      {/* Add Admin Modal  */}
      <AddAdmin />
    </>
  )
}

export default ManageAdmins
