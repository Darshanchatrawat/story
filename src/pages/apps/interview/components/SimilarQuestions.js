import { useState, useEffect, useRef, useContext } from "react";

import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, Input, Label, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from "@windmill/react-ui";

//components
import RoundIcon from "../../../../components/RoundIcon";
import InfoCard from "../../../../components/Cards/InfoCard";
import ExportExcel from "../../../../components/ExportExcel";
import QuestionAndAnswerPrint from "../../../../components/apps/interview/components/QuestionAndAnswerPrint";

//icon
import { QuestionIcon } from "../../../../icons";

//api
import { SimilarQuestionsApi, AnswerInterviewQuestionsApi, ReviewAnswerApi, saveAnswerApi } from "../../../../api/InterviewQuestion";

import Loader from "../../../../components/Loader";

//print 
import ReactToPrint, { useReactToPrint } from 'react-to-print';

//context
import { SnackbarContext } from "../../../../context/SnackbarContext";


export default function SimilarQuestions({ bodySimilar }) {
    //context 
    const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);


    const [page, setPage] = useState(1)
    const [data, setData] = useState({
        Successful: false,
        "Reply": [
        ],
        word_count: 0
    })

    // pagination setup
    const resultsPerPage = 10
    const totalResults = data.Reply.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }
    const [answerList, setAnswerList] = useState([]);
    const [reviewAnswerList, setReviewAnswerList] = useState([]);


    const [selectedQuestion, setSelectedQuestion] = useState([]);

    //loaders
    const [loader, setLoader] = useState(false);
    const [loaderAns, setLoaderAns] = useState(false);
    const [loaderRev, setLoaderRev] = useState(false);
    const [loaderSave, setLoaderSave] = useState(false);
    // toggle for ReviweAnswer Btn
    const [reviewBtnShow, setReviewBtnShow] = useState(false);
    // on page change, load new sliced data
    // here you would make another server request for new data
    // useEffect(() => {
    //     setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage).map((item, index) => ({ ...item, sales: index + 1 * index, contacts: index + 1 })))
    // }, [page]);

    //integrate
    const [body, setBody] = useState({
        "question": "",
        "no_of_questions": "",
        "job_title": ""
    });

    //submit
    const handleSubmit = async () => {
        setLoader(true);
        let res = await SimilarQuestionsApi(body).catch((err) => alert(err.data.message));
        setLoader(false);
        if (!res.success) return;
        setData(res.data.data);
        setAnswerList([]);
        setReviewAnswerList([]);
        window.scrollTo({ top: 1000000000000000, behavior: 'smooth' });
    }

    const handleSaveResult = async () => {
        setLoaderSave(true)
        const response = await saveAnswerApi({ job_title: body.job_title, question: selectedQuestion, answer: answerList, review_answer: reviewAnswerList });
        console.log('saved', response?.data)
        // alert('Saved successfully!')
        setLoaderSave(false);

        openSnackbar('Saved successfully', 'success')
        setTimeout(() => {
            closeSnackbar()
        }, 3000);
    }

    const handleGetAnswer = async () => {
        setLoaderAns(true)
        for (let i = 0; i < selectedQuestion?.length; i++) {
            const response = await AnswerInterviewQuestionsApi({ job_title: body.job_title, questions: selectedQuestion[i].question });

            let resData = response?.data?.data;
            setAnswerList(old => [...old, { id: selectedQuestion[i].id, answer: resData?.Reply }]);
            setData((old) => ({ ...old, word_count: old.word_count + Number(resData?.word_count || 0) }));
            if (i === selectedQuestion.length - 1) {
                setLoaderAns(false);
                setReviewBtnShow(true);
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
        if (bodySimilar) {
            setBody(bodySimilar);
        }
    }, [bodySimilar])



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

    return <div className="w-full sm:mb-1 mb-10" key={"similar-question"}>
        {/* <p className="blue-title">SIMILAR INTERVIEW QUESTION AND ANSWERS</p> */}

        <div className="container">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5 mb-5">
                <Label className='mt-5'>
                    <span>Question</span>
                    <Input key={"question"} value={body.question} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, question: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>
                <Label className='mt-5'>
                    <span>Job Title</span>
                    <Input key={"job_title"} value={body.job_title} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, job_title: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>
                <Label className='mt-5'>
                    <span>No Of Questions</span>
                    <Input key={"no_of_questions"} value={body.no_of_questions} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, no_of_questions: e.target.value }))
                    }} type="number" className="normal-input mt-1" />
                </Label>
            </div>
            <Button className="bg-primary mt-5" size="large" onClick={handleSubmit}><Loader hidden={!loader} />Submit</Button>
        </div>

        {
            data.Successful && <>
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
                        <div className="flex gap-4  w-full">
                            <Button className=" w-max bg-primary sm:mt-5 mt-3 sm:h-12 h-10" size="large" onClick={() => { !loaderSave && handleSaveResult() }}><Loader hidden={!loaderSave} /> Save</Button>

                            <div className="relative sm:ml-5 ml-2">
                                <Button className="w-max outline-primary-btn sm:mt-5 mt-3 sm:h-12 h-10 mr-1" size="large" onClick={() => setanswerDropdown((old) => !old)}>Answer</Button>

                                <Dropdown align="right" isOpen={answerDropdown} onClose={() => setanswerDropdown(false)}>
                                    <DropdownItem onClick={() => { !loaderAns && handleGetAnswer() }}>
                                        <Loader hidden={!loaderAns} /> <span>Get Answer</span>
                                    </DropdownItem>

                                    {reviewBtnShow && <DropdownItem onClick={handleReviewAnswer}>
                                        <Loader hidden={!loaderRev} /> <span>Review Answer</span>
                                    </DropdownItem>}
                                </Dropdown>
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
                </div>

                {/* Print Content start */}
                <div hidden={true}>
                    <div ref={printRef}>
                        <QuestionAndAnswerPrint data={printData} />
                    </div>
                </div>
                {/* Print Content end */}



                <div className="flex items-center">
                    <Input type="checkbox" className="mr-2" checked={selectedQuestion.length == data.Reply.length} onChange={(e) => {
                        let finalArr = [];
                        if (e.target.checked == false) {
                            return setSelectedQuestion(finalArr);
                        }
                        finalArr = data.Reply.map((item, index) => ({ id: index, question: item }));
                        setSelectedQuestion(finalArr);
                    }} />
                    {selectedQuestion.length == data.Reply.length ? <p>Deselect All</p> : <p>Select All</p>}
                </div>

                {data?.Reply?.map((item, i) => {
                    let selected = selectedQuestion.find((qus) => qus.question == item);
                    let ansData = answerList?.findIndex(itm => itm.id === i);
                    let ansReviewData = reviewAnswerList?.findIndex(itm => itm.id === i);

                    return (
                        <>
                            <hr className="my-7" />
                            {/* Checkbox */}
                            <div className="flex items-center gap-2 ">
                                <span className="text-sm"><Input type="checkbox" checked={selected} onClick={() => {
                                    setSelectedQuestion(old => {
                                        let obj = { id: i, question: item };
                                        let id = old.find((qus) => qus.id == i);
                                        if (!id) {
                                            return [...old, obj];
                                        } else {
                                            return old.filter((qus) => qus.id != i);
                                        }
                                    });
                                }} /></span>
                                <span className="text-lg font-semibold">{item}</span><br></br>
                            </div>
                            {/* Question Word Count */}
                            {/* <span className="text-sm">{countWords(item)}</span> */}

                            {/* Answer Tab */}
                            {ansData !== -1 &&
                                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#EFF4FE' }}>
                                    <span className="font-bold text-lg block" style={{ color: '#0C3469' }}>Answer:</span>
                                    <span className="mt-4 font-semibold">{answerList[ansData]?.answer}</span>
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

    </div>
}