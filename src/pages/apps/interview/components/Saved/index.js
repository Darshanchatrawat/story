import { useState, useEffect, useRef } from "react";

import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, Input, Label, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow, Textarea } from "@windmill/react-ui";
import CreatableSelect from 'react-select/creatable';

//components
import RoundIcon from "../../../../../components/RoundIcon";
import InfoCard from "../../../../../components/Cards/InfoCard";
import ProfileWithAvatar from "../../../../../components/ProfileWithAvatar"
import ViewTag from "../Saved/ViewTag"

//icon
import { EyeIcon, QuestionIcon } from "../../../../../icons";

//dummy data
import response from '../../../../../utils/demo/tableData'

//api
import { GenerateInterviewQuestionsApi, AnswerInterviewQuestionsApi, ReviewAnswerApi, saveAnswerApi, GetSaveData, updateQuestionAnswer, getJobTitles } from "../../../../../api/InterviewQuestion";

import Loader from "../../../../../components/Loader";
import CircleLoadButton from "../../../../../components/CircleLoadButton";

import styled from "styled-components";
import moment from "moment";

//print 
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ExportExcel from "../../../../../components/ExportExcel";
import SavedQuestionAndAnswerPrint from "../../../../../components/apps/interview/components/SavedQuestionAndAnswerPrint";


export default function Saved({ setSimilarBody }) {
    const [page, setPage] = useState(1)

    // table rendering data
    const [data, setData] = useState({
        Successful: false,
        "Reply": [
        ],
        word_count: 0
    });
    const [answerList, setAnswerList] = useState([]);
    const [reviewAnswerList, setReviewAnswerList] = useState([]);


    const [selectedQuestion, setSelectedQuestion] = useState([]);

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }

    //integrate
    const [body, setBody] = useState({
        "job_title": "",
        "question": ""
    });
    //loaders
    const [loader, setLoader] = useState(false);
    const [loaderAns, setLoaderAns] = useState("");
    const [loaderRev, setLoaderRev] = useState(false);
    const [loaderSave, setLoaderSave] = useState(false);
    // toggle for ReviweAnswer Btn
    const [reviewBtnShow, setReviewBtnShow] = useState(false);

    const [total, setTotal] = useState(null);
    const handleSubmit = async () => {
        setLoader(true);
        let res = await GenerateInterviewQuestionsApi({ ...body, no_of_questions: 5 }).catch((err) => alert(err.data.message));
        setLoader(false);
        if (!res.success) return;
        // console.log("aaaaaaaa", res.data.data);
        setData(res.data.data);
        setAnswerList([]);
        setReviewAnswerList([]);
    }

    const handleSaveResult = async () => {
        setLoaderSave(true)
        const response = await saveAnswerApi({ job_title: body.job_title, question: selectedQuestion, answer: answerList, review_answer: reviewAnswerList });
        console.log('saved', response?.data)
        alert('Saved successfully!')
        setLoaderSave(false);
    }

    const handleGetAnswer = async (data) => {
        setLoaderAns(data.question)
        const response = await AnswerInterviewQuestionsApi({ job_title: data.job_title, questions: data.question });
        if (!response?.success) return;
        setsaveData((old) => old.map((item) => item.question == data.question ? { ...item, answer: response?.data?.data?.Reply } : item));
        updateQuestionAnswer({})
        setLoaderAns("");
        await updateQuestionAnswer({ id: data?._id, answer: response?.data?.data?.Reply });
    }

    const handleReviewAnswer = async (data) => {
        setLoaderAns(data.question)
        const response = await ReviewAnswerApi({ job_title: data.job_title, question: data.question, answer: data.answer });
        if (!response?.success) return;
        setsaveData((old) => old.map((item) => item.question == data.question ? { ...item, review_answer: response?.data?.data?.Reply } : item));
        setLoaderAns("");
        await updateQuestionAnswer({ id: data?._id, review_answer: response?.data?.data?.Reply });
    }

    const [saveData, setsaveData] = useState([]);
    const [filter, setFilter] = useState({ limit: 5, page: 0 });
    const [load, setLoad] = useState(false);

    const handleGetSaveInterview = async (more) => {
        more && setLoad(true);
        let query = new URLSearchParams(filter).toString();
        const response = await GetSaveData(`&${query}`);
        more && setLoad(false);

        if (!response?.success || response?.data?.data?.length == 0) return setLoad("hide");
        setsaveData((old) => [...old, ...response.data?.data] || []);
        setTotal(response.data?.totalInterview)
    }

    const [isFilter, setisFilter] = useState(false);
    const handleFilterGetSaveInterview = async () => {
        setLoader(true);
        setLoad("hide");
        setisFilter(true)
        let query = new URLSearchParams({ ...body, job_title: body.job_title?.value || "" }).toString();
        const response = await GetSaveData(`&${query}`);
        setLoader(false);
        if (!response?.success) return;

        setsaveData(response.data?.data || []);
    }

    function countWords(str) {
        return str.trim().split(/\s+/).length;
    }

    useEffect(() => {
        handleGetSaveInterview(true)
    }, [filter]);

    const [jobData, setJobData] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await getJobTitles();
            setJobData(data?.data?.data)
        })();
    }, []);


    //Handle Data
    const ConvertData = () => {
        return new Promise((done, cancel) => {
            let finalArr = [];
            try {
                for (let i = 0; i < saveData.length; i++) {
                    const item = saveData[i] || {};

                    finalArr.push({
                        id: finalArr.length + 1,
                        job_title: item.job_title,
                        created_by: item.created_by?.name,
                        updated_by: item.updated_by?.name,
                        date: item.updatedAt,
                        question: item.question,
                        answer: item.answer,
                        review_answer: item.review_answer,
                    })
                }
                done(finalArr);
            } catch (error) {
                cancel(error);
            }
        })
    }

    //download excel
    const [downloadDropdown, setdownloadDropdown] = useState(false);

    const [excelLoader, setexcelLoader] = useState(false);
    const handleDownloadExcel = async () => {
        setexcelLoader(true);
        let finalArr = await ConvertData();
        setexcelLoader(false);
        return ExportExcel({ csvData: finalArr, fileName: "queries.ai", download: true });
    }

    //download pdf
    const printRef = useRef();

    const [pdfLoader, setpdfLoader] = useState(false);
    const [printData, setprintData] = useState([]);

    //open printer
    const printHandler = useReactToPrint({
        content: () => printRef.current
    });
    //main print function
    const handleDownloadPdf = async () => {
        setpdfLoader(true);

        let finalArr = await ConvertData();

        setprintData(finalArr);
        setpdfLoader(false);

        printHandler()
    };


    //---------------- view tag -----------------
    const [tagModal, settagModal] = useState({
        open: false,
        data: [],
        openModal: function (arr) {
            this.data = arr;
            this.open = true;
            return this;
        },
        closeModal: function () {
            this.open = false;
            this.data = [];
            return this;
        }
    });

    return <div className="w-full">
        <p className="blue-title">SAVED INTERVIEW QUESTIONS & ANSWERS</p>

        <div className="container sm:flex  items-center justify-between" >
            <Container className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5  mb-5 ">
                {/* <Label className='mt-5'>
                    <span>Job Title</span>
                    <Input key={"job_title"} value={body.job_title} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, job_title: e.target.value })) 
                    }} className="normal-input mt-1" />
                </Label> */}

                <Label className='mt-5'>
                    <span>Job Title</span>
                    <CreatableSelect
                        // className="block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 focus:ring focus:ring-purple-300 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700 normal-input mt-1"
                        className="normal-input mt-1 custom-select-input"
                        isClearable
                        isSearchable
                        value={body.job_title}
                        options={jobData.map((item) => ({ value: item.job_title, label: item.job_title }))} onChange={(e) => setBody((old) => ({ ...old, job_title: e }))}
                    />
                </Label>

                <Label className='mt-5'>
                    <span>QUESTIONS</span>
                    <Input key={"question"} value={body.question} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, question: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>

            </Container>
            <div className="flex sm:gap-5">
                <div className="flex items-center">
                    <Button className="bg-primary sm:mt-5 mt-3 sm:h-12 h-10" size="large" onClick={() => handleFilterGetSaveInterview()}><Loader hidden={!loader} /> Submit</Button>
                    {/* <Button className="mt-5 ml-3 outline-primary-btn" size="large" onClick={() => {
                    window.location.reload()
                }}>Reset</Button> */}
                </div>



                <div className="relative ml-auto">
                    <Button className="w-max sm:mt-5 mt-3 sm:h-12 h-10" style={{ backgroundColor: "black" }} size="large" onClick={() => setdownloadDropdown((old) => !old)}>Export</Button>

                    <Dropdown align="right" isOpen={downloadDropdown} onClose={() => setdownloadDropdown(false)}>
                        <DropdownItem onClick={handleDownloadPdf}>
                            <Loader hidden={!pdfLoader} /> <span>Export PDF</span>
                        </DropdownItem>

                        <DropdownItem onClick={handleDownloadExcel}>
                            <Loader hidden={!excelLoader} /> <span>Export Excel</span>
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>
        </div>
        <hr className="my-7" />

        {/* Print Content start */}
        <div hidden={true}>
            <div ref={printRef}>
                <SavedQuestionAndAnswerPrint data={printData} />
            </div>
        </div>
        {/* Print Content end */}


        {
            saveData.length > 0 && <>

                <div className="flex item-center justify-between">
                    <p className="blue-title">Total Q&As: {total}</p>
                    {isFilter && <p className="blue-title">Search Result: {saveData.length}</p>}
                </div>

                {saveData.map((item, i) => {
                    // let ansData = answerList?.findIndex(itm => itm.id === i);
                    // let ansReviewData = reviewAnswerList?.findIndex(itm => itm.id === i);
                    return (
                        <>
                            {i > 0 ? <hr className="my-7" /> : <div className="my-7" />}
                            <div className="flex justify-between mb-2 items-end">
                                <span className="font-semibold gray-label " style={{ fontSize: 14 }}>Updated on: {moment(item.updatedAt).format("DD MMMM YY")}</span>
                                {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-300 px-3 py-2 rounded-2xl">
                                    <h1 className="text-white ">{item?.created_by?.name}</h1>
                                </div> */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-300 px-4 py-2 rounded-2xl" style={{ background: "var(--blue-gradient)" }}>
                                    <h1 className="text-white font-semibold">{item?.job_title}</h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-between mr-3">
                                <span className="text-lg font-semibold">{item.question}</span>
                                <EyeIcon className="cursor-pointer" onClick={() => settagModal({ ...tagModal.openModal(item?.tag || []) })} />
                            </div>
                            <br></br>

                            <div className="flex items-center justify-between mt-3 mb-5">
                                <ProfileWithAvatar label={"Created by:"} name={item.created_by?.name} />
                                <ProfileWithAvatar label={"Updated by:"} name={item.updated_by?.name || item.created_by?.name} />
                            </div>

                            {item.answer ?
                                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#EFF4FE' }}>
                                    <span className="font-bold text-lg block mb-2" style={{ color: '#0C3469' }}>Answer:</span>
                                    <DescText className="mt-4 font-semibold">{item.answer}</DescText>
                                </div> :
                                <Button className="bg-primary mt-5 h-12" size="large" onClick={() => handleGetAnswer(item)}>{loaderAns == item.question ? <Loader /> : 'GetAnswer'}</Button>
                            }
                            {item.review_answer ?
                                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#FFEDED' }}>
                                    <span className="font-bold text-lg block mb-2" style={{ color: '#0C3469' }}>Review Answer:</span>
                                    <DescText className="mt-4 font-semibold">{item.review_answer}</DescText>
                                </div> : item.answer &&
                                <Button className="bg-primary mt-5 h-12" size="large" onClick={() => handleReviewAnswer(item)}>{loaderAns == item.question ? <Loader /> : 'Review Answer'}</Button>
                            }
                        </>
                    )
                })}


                {load != "hide" && <div className="flex items-center justify-center mt-10">
                    {load ? <Loader /> : <CircleLoadButton onClick={() => {
                        setFilter((old) => ({ ...old, page: old.page + 1 }))
                    }} />}
                </div>}
            </>
        }


        {/* -------------------------- View Tag -------------------------------- */}
        <ViewTag data={tagModal.data} open={tagModal.open} close={() => settagModal({ ...tagModal.closeModal() })} />
    </div>
}

const DescText = styled.span`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    line-height: 24px;

    letter-spacing: -0.02em;

    color: #213241;

`;
const Container = styled.div`
width:70%;
@media (max-width:480px){
 width:100%

}
`