import { PlusIcon } from "../icons";
import styled from "styled-components";

export default function CircleLoadButton(props) {
    return <Container className="flex items-center justify-center cursor-pointer" {...props}>
        <PlusIcon />
    </Container>
}

const Container = styled.div`
    width: 70px;
    height: 70px;
    border: 1px solid #848484;
    border-radius: 50%;
`;