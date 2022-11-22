import styled from 'styled-components';
import AvatarCustom from '../Avatar';


export default function ProfileWithAvatar({ label,name }) {
    return <div className='flex items-center'>
        <Label class="">{label}</Label>
        <div className='flex items-center ml-3'>
            <AvatarCustom name={name} className="align-middle mr-2" style={{ height: 30,width: 30 }} />
            <Name>{name}</Name>
        </div>
    </div>

}

const Label = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    display: flex;
    align-items: center;

    color: #848484;
`;

const Name = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: bolder;
    font-size: 14px;
    line-height: 17px;

    color: #292D32;
`;