import { useState, useEffect, useRef, useContext } from "react";
import CreatableSelect from 'react-select/creatable';
import { Avatar, Button, Card, Select, CardBody, Input, Label, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow, Textarea, Dropdown, DropdownItem } from "@windmill/react-ui";

//components
import RoundIcon from "../../../../components/RoundIcon";
import InfoCard from "../../../../components/Cards/InfoCard";
import ExportExcel from "../../../../components/ExportExcel";
import QuestionAndAnswerPrint from "../../../../components/apps/interview/components/QuestionAndAnswerPrint";

//icon
import { QuestionIcon } from "../../../../icons";

//dummy data
import response from '../../../../utils/demo/tableData'

//api
import { GenerateInterviewQuestionsApi, AnswerInterviewQuestionsApi, ReviewAnswerApi, saveAnswerApi, getJobTitles } from "../../../../api/InterviewQuestion";

import Loader from "../../../../components/Loader";

//print 
import ReactToPrint, { useReactToPrint } from 'react-to-print';

//context
import { SnackbarContext } from "../../../../context/SnackbarContext";
import styled from "styled-components";


export default function GenerateInterviewQuestions({ setSimilarBody }) {
    //context 
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);


    const [page, setPage] = useState(1)

    //save job_titles
    const [jobData, setJobData] = useState([]);
    const [isNewJobTitle, setIsNewJobTitle] = useState(true);
    // table rendering data
    const [data, setData] = useState({
        Successful: false,
        "Reply": [
        ],
        word_count: 0
    });
    const [answerList, setAnswerList] = useState([]);
    const [reviewAnswerList, setReviewAnswerList] = useState([]);
    const [tag, settag] = useState('');


    const [selectedQuestion, setSelectedQuestion] = useState([]);

    // pagination setup
    const resultsPerPage = 10
    const totalResults = data.Reply.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }

    //integrate
    const [ansShould, setAnsShould] = useState('')
    const [body, setBody] = useState({
        "job_title": "",
        "no_of_questions": "",
        "skills": "",
        "type_of_questions": "",
        "interview_category": "",
        // "extra_instructions": ""
    });
    //loaders
    const [loader, setLoader] = useState(false);
    const [loaderAns, setLoaderAns] = useState(false);
    const [loaderRev, setLoaderRev] = useState(false);
    const [loaderSave, setLoaderSave] = useState(false);
    const [loaderAnsShould, setLoaderAnsShould] = useState(false);
    // toggle for ReviweAnswer Btn
    const [reviewBtnShow, setReviewBtnShow] = useState(false);

    const handleSubmit = async () => {
        setLoader(true);
        let res = await GenerateInterviewQuestionsApi({ ...body, isNewJobTitle: String(isNewJobTitle), job_title: body.job_title }).catch((err) => alert(err.data.message));
        setLoader(false);
        if (!res.success) return;
        // console.log("aaaaaaaa", res.data.data);
        setData(res.data.data);
        setAnswerList([]);
        setReviewAnswerList([]);
        window.scrollTo({ top: 1000000000000000, behavior: 'smooth' });
    }

    const handleSaveResult = async () => {
        setLoaderSave(true)
        const response = await saveAnswerApi({ job_title: body.job_title, question: selectedQuestion, answer: answerList, review_answer: reviewAnswerList, tag: { title: tag } });
        console.log('saved', response?.data);
        setLoaderSave(false);
        settag('');
        if (!response?.success) return;

        //alert
        openSnackbar('Saved successfully', 'success')
        setTimeout(() => {
            closeSnackbar()
        }, 3000);
    }

    const handleGetAnswer = async (index, question, ansShouldIncludeCheck) => {
        if (ansShouldIncludeCheck) {
            setLoaderAnsShould(question)
            const response = await AnswerInterviewQuestionsApi({ job_title: body.job_title, questions: question, ans_should_include: ansShould });
            let resData = response?.data?.data;

            setAnswerList(old => {
                let indexOfElement = old.findIndex(item => item.id === index);
                let element = old[indexOfElement];
                element.answer = resData?.Reply;
                old.splice(indexOfElement, 1);
                return [...old, element];
            });
            setData((old) => ({ ...old, word_count: old.word_count + Number(resData?.word_count || 0) }));
            setLoaderAnsShould(false)
        } else {
            setLoaderAns(true)
            for (let i = 0; i < selectedQuestion?.length; i++) {
                const response = await AnswerInterviewQuestionsApi({ job_title: body.job_title, questions: selectedQuestion[i].question, ans_should_include: ansShould });
                let resData = response?.data?.data;
                setAnswerList(old => [...old, { id: selectedQuestion[i].id, answer: resData?.Reply }]);
                setData((old) => ({ ...old, word_count: old.word_count + Number(resData?.word_count || 0) }));
                if (i === selectedQuestion.length - 1) {
                    setLoaderAns(false);
                    setReviewBtnShow(true);
                }
            }
        }
    }

    const handleReviewAnswer = async () => {
        setLoaderRev(true)
        for (let j = 0; j < selectedQuestion?.length; j++) {
            let index = answerList?.findIndex(itm => itm.id === selectedQuestion[j].id);
            let answer = answerList[index]?.answer;
            if (answer) {
                const response = await ReviewAnswerApi({ job_title: body.job_title, question: selectedQuestion[j]?.question, answer });
                let resData = response?.data?.data;
                setReviewAnswerList(old => [...old, { id: selectedQuestion[j].id, answer: resData?.Reply }]);
                setData((old) => ({ ...old, word_count: old.word_count + Number(resData?.word_count || 0) }));

            }
            console.log(j, selectedQuestion.length - 1);
        }
        setLoaderRev(false);
    }

    function countWords(str) {
        return str.trim().split(/\s+/).length;
    }

    useEffect(() => {
        (async () => {
            const data = await getJobTitles();
            setJobData(data?.data?.data)
        })();
    }, [])


    const ConvertData = () => {
        return new Promise((done, cancel) => {
            let finalArr = [];
            try {
                for (let i = 0; i < selectedQuestion.length; i++) {
                    const question = selectedQuestion[i] || {};

                    const answer = answerList.find((item) => item?.id == question.id)?.answer || "";
                    const review_answer = reviewAnswerList.find((item) => item?.id == question.id)?.answer || "";

                    finalArr.push({
                        id: finalArr.length + 1,
                        question: question.question,
                        answer: answer,
                        review_answer: review_answer,
                    })
                }
                done(finalArr);
            } catch (error) {
                cancel(error);
            }
        })
    }

    //answer dropdown
    const [answerDropdown, setanswerDropdown] = useState(false);


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
    }

    return <div className="w-full">
        <GenerateIQ>
            <p className="blue-title ">GENERATE INTERVIEW QUESTIONS & ANSWERS</p>
        </GenerateIQ>
        <div className="container">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <Label className='mt-5'>
                    <span>Job Title</span>
                    <CreatableSelect
                        // className="block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-purple-400 border-gray-300 dark:border-gray-600 focus:ring focus:ring-purple-300 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700 normal-input mt-1"
                        className="normal-input mt-1 custom-select-input"
                        isClearable
                        isSearchable
                        value={{ label: body.job_title, value: body.job_title }}
                        options={jobData.map((item) => ({ value: item.job_title, label: item.job_title }))} onChange={(e) => setBody((old) => ({ ...old, job_title: e?.value }))}
                    />
                </Label>

                <Label className='mt-5'>
                    <span>Number of Questions</span>
                    <Input key={"no_of_questions"} value={body.no_of_questions} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, no_of_questions: e.target.value }))
                    }} type="number" className="normal-input2 mt-1" />
                </Label>
            </div>
            <div>
                <Label className='mt-5'>
                    <span>Skills</span>
                    <Textarea rows="3" key={"extra_instructions"} value={body.skills} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, skills: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>
            </div>
            <div className="grid sm:grid-cols-2  grid-cols-1 gap-5 mb-5">
                <Label className='mt-5'>
                    <span>Type of questions</span>
                    <Select className="mt-1" value={body.type_of_questions} onChange={e => setBody({ ...body, type_of_questions: e.target.value })}>
                        <option value={""}></option>
                        <option value={"Behavioral Questions"}  >Behavioral Questions</option>
                        <option value={"Communication Questions"}>Communication Questions</option>
                        <option value={"Opinion Questions"}>Opinion Questions</option>
                        <option value={"Performance-Based Questions"}>Performance-Based Questions</option>
                        <option value={"Brainteaser Questions"}>Brainteaser Questions</option>
                    </Select>
                </Label>

                <Label className='mt-5'>
                    <span>Interview category</span>
                    <Select className="mt-1" value={body.interview_category} onChange={e => setBody({ ...body, interview_category: e.target.value })}>
                        <option value={""}></option>
                        <option value={"Panel Interview"}>Panel Interview</option>
                        <option value={"Structured Interview"}>Structured Interview</option>
                        <option value={"Unstructured Interview"}>Unstructured Interview</option>
                        <option value={"Stress Interview"}>Stress Interview</option>
                        <option value={"Case Interview"}>Case Interview</option>
                    </Select>
                </Label>
            </div>

            <Button className="bg-primary mt-5 " size="large" onClick={handleSubmit}><Loader hidden={!loader} />Submit</Button>
        </div>

        {
            data.Successful && <>
                {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 mt-5"> */}
                <div className="sm:flex gap-6 mb-8 sm:mt-5 mt-3">
                    <InfoCard title="Total Words" value={data.word_count} containerProps={{ style: { width: "300px" } }}>
                        <RoundIcon
                            icon={QuestionIcon}
                            iconColorClass="text-orange-500 dark:text-orange-100"
                            bgColorClass="bg-orange-100 dark:bg-orange-500"
                            className="mr-4"
                        />
                    </InfoCard>
                    <div className="w-full">
                        <p>Actions</p>
                        <div className="flex  gap-4  w-full">
                            <Button className=" w-max bg-primary sm:mt-5 mt-3 sm:h-12 h-10" size="large" onClick={() => { !loaderSave && handleSaveResult() }}><Loader hidden={!loaderSave} /> Save</Button>

                            <div className="relative sm:ml-5 ml-2 ">
                                <Button className=" w-max outline-primary-btn sm:mt-5 mt-3 sm:h-12 h-10 mr-1" size="large" onClick={() => setanswerDropdown((old) => !old)}>Answer</Button>

                                <Dropdown align="right" isOpen={answerDropdown} onClose={() => setanswerDropdown(false)}>
                                    <DropdownItem onClick={() => { !loaderAns && handleGetAnswer() }}>
                                        <Loader hidden={!loaderAns} /> <span >Get Answer</span>
                                    </DropdownItem>

                                    {reviewBtnShow && <DropdownItem onClick={handleReviewAnswer}>
                                        <Loader hidden={!loaderRev} /> <span>Review Answer</span>
                                    </DropdownItem>}
                                </Dropdown>
                            </div>

                            <div className="relative ml-auto">
                                <Button className="w-max sm:mt-5 mt-3 sm:h-12 h-10" style={{ backgroundColor: "black" }} size="large" onClick={() => setdownloadDropdown((old) => !old)}>Export</Button>

                                <Dropdown align="right" isOpen={downloadDropdown} onClose={() => setdownloadDropdown(false)}>
                                    <DropdownItem onClick={handleDownloadPdf} >
                                        <Loader hidden={!pdfLoader} /> <span>Export PDF</span>
                                    </DropdownItem>

                                    <DropdownItem onClick={handleDownloadExcel}>
                                        <Loader hidden={!excelLoader} /> <span>Export Excel</span>
                                    </DropdownItem>
                                </Dropdown>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Print Content start */}
                <div hidden={true}>
                    <div ref={printRef}>
                        <QuestionAndAnswerPrint data={printData} />
                    </div>
                </div>
                {/* Print Content end */}

                <div className="flex items-center">
                    <div className="flex items-center" style={{ width: "150px" }}>
                        <Input type="checkbox" className="mr-2 " checked={selectedQuestion.length == data.Reply.length} onChange={(e) => {
                            let finalArr = [];
                            if (e.target.checked == false) {
                                return setSelectedQuestion(finalArr);
                            }
                            finalArr = data.Reply.map((item, index) => ({ id: index, question: item }));
                            setSelectedQuestion(finalArr);
                        }} />
                        {selectedQuestion.length == data.Reply.length ? <p className="sm:text-md text-sm">Deselect All</p> : <p className="sm:text-md text-sm">Select All</p>}
                    </div>

                    <Input placeholder="Tag" value={tag} onChange={(e) => settag(e.target.value)} className="normal-input" />
                </div>

                {data?.Reply?.map((item, i) => {
                    let selected = selectedQuestion.find((qus) => qus.question == item);
                    let ansData = answerList?.findIndex(itm => itm.id === i);
                    let ansReviewData = reviewAnswerList?.findIndex(itm => itm.id === i);

                    return (
                        <>
                            <hr className="my-7" />
                            {/* Checkbox */}
                            <div className="flex  gap-3">
                                <span className="text-sm"><Input type="checkbox" checked={selected} onClick={() => {
                                    setSelectedQuestion(old => {
                                        let obj = { id: i, question: item };
                                        // let index = old.findIndex(item => item.id === i);
                                        // if (index && index !== -1) {
                                        //     old.splice(index, 1);
                                        //     return [...old];
                                        // }
                                        // return [...old, obj]
                                        let id = old.find((qus) => qus.id == i);
                                        if (!id) {
                                            return [...old, obj];
                                        } else {
                                            return old.filter((qus) => qus.id != i);
                                        }
                                    });
                                }} /></span>

                                <div className="flex flex-col sm:flex-row justify-center sm:items-center w-full">
                                    <span className="sm:text-lg text-sm font-semibold">{item}</span>
                                    <span className="text-purple-500 cursor-pointer ml-auto sm:text-lg text-sm" onClick={() => setSimilarBody({ question: item, ...body })}>find similar</span>
                                </div> <br></br>
                            </div>
                            {/* Question Word Count */}
                            {/* <span className="text-sm">{countWords(item)}</span> */}

                            {/* Answer Tab */}
                            {ansData !== -1 &&
                                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#EFF4FE' }}>
                                    <span className="font-bold text-lg block" style={{ color: '#0C3469' }}>Answer:</span>
                                    <span className="mt-4 font-semibold">{answerList[ansData]?.answer}</span>
                                    <div className="sm:flex-row flex flex-col gap-4  mt-2">
                                        <Input key={"no_of_questions"} placeholder="Answer should include" onChange={(e) => {
                                            e.persist();
                                            setAnsShould(e.target.value)
                                        }} className="normal-input mt-1" />

                                        <div>
                                            <Button style={{ width: "max-content" }} onClick={e => handleGetAnswer(i, item, true)}><Loader hidden={loaderAnsShould != item} /> Get Answer</Button>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* Answer Review Tab */}
                            {ansReviewData !== -1 &&
                                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#FFEDED' }}>
                                    <span className="font-bold text-lg block" style={{ color: '#0C3469' }}>Review Answer:</span>
                                    <span className="mt-4 font-semibold">
                                        {reviewAnswerList[ansReviewData]?.answer}
                                    </span>
                                </div>
                            }
                        </>
                    )
                })}

            </>
        }
    </div >
}


{/* <Label className='mt-5'>
<span>Job Title</span>
<Select className="mt-1"
    onChange={(e) => {
        e.persist();
        setIsNewJobTitle(false);
        setBody((old) => ({ ...old, job_title: e.target.value }))
    }}>
    {
        jobData?.map(itm => {
            return (
                <option value={itm?.job_title}>{itm?.job_title}</option>
            )
        })
    }
</Select>


<Input key={"job_title"} value={body.job_title} onChange={(e) => {
    e.persist();
    setIsNewJobTitle(false)
    setBody((old) => ({ ...old, job_title: e.target.value }));

}} className="normal-input mt-1" />

</Label> */}

const GenerateIQ = styled.p`
@media (max-width: 480px) {
    .blue-title{
        font-size:11px;
  }

}`;
