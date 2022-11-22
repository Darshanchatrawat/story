import styled from 'styled-components'
import PageTitle from '../components/Typography/PageTitle'

const AppCard = ({ imgUrl, title, desc, active }) => {
    return <Card active={active} className="relative p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <ImgContainer className='flex items-center justify-center'>
            <Img src={imgUrl} />
        </ImgContainer>
        <a href="#">
            <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-700 dark:text-white">{title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{desc}</p>

        {active && <>
            {/* <div className="tag-container">
                <Tag className='font-normal text-gray-500'>BOSS MODE</Tag>
                
            </div> */}
            <Active />
        </>}
    </Card>
}
const Card = styled.div` 
    height: fit-content;
    width: 360px;
    cursor: pointer;
    ${props => props.active && "border: 2px solid #9527e5;"}

    @media (max-width: 1600px){
        width: 320px;
    }
`;
const ImgContainer = styled.div`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    padding: 10px;
    background: var(--light-gray);
`;
const Img = styled.img`
    height: 50px;
    width: 50px;
    object-fit: contain;
`;

const Tag = styled.span`
    color: #18a34a;
    font-size: 12px;
    background: #dcfce6;
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: bolder;
    border: 2px solid #49de80;
    margin-right: 5px;
`;

const Active = styled.div`
    position: absolute;
    background: #9527e5;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
`;

export default function Apps() {
    return <div className="container">
        <PageTitle>Apps</PageTitle>
        {/* <div class="grid grid-cols-4 gap-4"> */}
        <div className='flex flex-wrap gap-4'>
            <AppCard active={true} title={"Interview Questions and Answers"} desc={"Create lists of interview questions and answers based on a job title and the type of questions and interview you are looking for."} imgUrl={"/favicon.ico"} />

        </div>
    </div>
}