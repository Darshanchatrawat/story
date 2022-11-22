import { useContext, useState } from "react";
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Select } from "@windmill/react-ui";

//api
import { addUserInTeam } from "../../../api/interview/team";

//context
import { SnackbarContext } from "../../../context/SnackbarContext"

export default function AddClient({ teamId,reload }) {
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

    //add Client
    const [addClientModal, setaddClientModal] = useState({
        open: false,
        body: {
            name: "",
            email: "",
            password: "",
            teamRole: "teamUser"
        },
        updateBody: function (type, value) {
            this.body[type] = value;
            return this;
        },
        closeModal: function() {
            this.body = {
                name: "",
                email: "",
                password: "",
                teamRole: "teamUser" 
            };
            this.open = false;

            return this;
        }
    });

    const handleSubmit = async () => {
        let res = await addUserInTeam({ teamId, body: addClientModal.body }).catch((err) => {
            openSnackbar(err.data.message, "danger");
            setTimeout(() => {
                closeSnackbar();
            }, 3000);
        });
        if (!res?.success) return;
        reload();
        
        openSnackbar(`User added successfully`, "success");
        setTimeout(() => {
            closeSnackbar();
        }, 3000);

        setaddClientModal((old) => ({ ...old.closeModal() }));
    }

    return <>
        <Button onClick={() => setaddClientModal((old) => ({ ...old, open: true }))} style={{ background: 'rgba(14, 159, 110, var(--tw-text-opacity))' }} >Add Client</Button>

        <Modal key={"add_client_modal"} isOpen={addClientModal.open} onClose={() => setaddClientModal((old) => ({ ...old.closeModal() }))}>
            <ModalHeader>Add Client</ModalHeader>
            <ModalBody>
                <Label className='mt-5'>
                    <span>Name</span>
                    <Input key={"key_name"} onChange={(e) => {
                        e.persist();
                        setaddClientModal((old) => ({ ...old.updateBody("name", e?.target?.value) }));
                    }} value={addClientModal.body?.name} className="mt-1" placeholder="Jane Doe" />
                </Label>
                <Label className='mt-5'>
                    <span>Email</span>
                    <Input key={"key_email"} onChange={(e) => {
                        e.persist();
                        setaddClientModal((old) => ({ ...old.updateBody("email", e?.target?.value) }));
                    }
                    } value={addClientModal.body?.email} className="mt-1" placeholder="email@example.com" />
                </Label>
                <Label className='mt-5'>
                    <span>Password</span>
                    <Input key={"key_password"} onChange={(e) => {
                        e.persist();
                        setaddClientModal((old) => ({ ...old.updateBody("password", e?.target?.value) }));
                    }} value={addClientModal.body?.password} type="password" className="mt-1" />
                </Label>
                <Label className='mt-5'>
                    <span>Role</span>
                    <Select className="mt-1" onChange={(e) => {
                        e.persist();
                        setaddClientModal((old) => ({ ...old.updateBody("teamRole", e?.target?.value) }));
                    }} value={addClientModal.body.teamRole}>
                        <option value={"teamUser"}>Team User</option>
                        <option value={"teamAdmin"}>Team Admin</option>
                    </Select>
                </Label>
            </ModalBody>

            <ModalFooter>
                <div className="hidden sm:block">
                    <Button layout="outline" onClick={() => setaddClientModal((old) => ({ ...old.closeModal() }))}>
                        Cancel
                    </Button>
                </div>
                <div className="hidden sm:block">
                    <Button onClick={handleSubmit}>Create</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={() => setaddClientModal((old) => ({ ...old.closeModal() }))}>
                        Cancel
                    </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button onClick={handleSubmit} block size="large">
                        Accept
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    </>
}