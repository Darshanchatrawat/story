import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@windmill/react-ui";

export default function ViewTag({ data = [], open, close }) {
    return <Modal isOpen={open} onClose={close}>
        <ModalHeader className="mt-0 mb-5" style={{ marginTop: 0 }}>Tags</ModalHeader>
        <ModalBody>
            {
                data.map((item,index) => {
                    index = index+1
                    return <>
                        <span className="mt-4 font-semibold">{index}. {item?.title}</span>
                        <hr className="my-2" />
                    </>
                })
            }
        </ModalBody>
        <ModalFooter>
            <div className="hidden sm:block">
                <Button layout="outline" onClick={close}>
                    Cancel
                </Button>
            </div>
        </ModalFooter>
    </Modal>
}