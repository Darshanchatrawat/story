import { useState, useEffect } from "react";

import { Avatar, Button, Card, CardBody, Input, Label, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from "@windmill/react-ui";
//components
import RoundIcon from "../../../../components/RoundIcon";
import InfoCard from "../../../../components/Cards/InfoCard";

//icon
import { QuestionIcon } from "../../../../icons";

//api
import { ReviewAnswerApi } from "../../../../api/InterviewQuestion";

import Loader from "../../../../components/Loader";

export default function ReviewAnswer() {
    const [page, setPage] = useState(1)
    const [data, setData] = useState({
        "Successful": false,
        "Reply": "",
        "word_count": 0
    })

    //integrate
    const [body, setBody] = useState({
        "question": "",
        "answer": ""
    });
    //submit
    const [loader, setLoader] = useState(false);
    const handleSubmit = async () => {
        setLoader(true);
        let res = await ReviewAnswerApi(body).catch((err) => alert(err.data.message));
        setLoader(false);
        if (!res.success) return;
        setData(res.data.data);
    }

    function countWords(str) {
        return str.trim().split(/\s+/).length;
    }
    return <div className="w-full">
        <p className="blue-title">REVIEW ANSWER</p>


        <div className="container">
            <div className="grid grid-cols-2 gap-5">
                <Label className='mt-5'>
                    <span>Question</span>
                    <Input key={"question"} value={body.question} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, question: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>

                <Label className='mt-5'>
                    <span>Answer</span>
                    <Input key={"answer"} value={body.answer} onChange={(e) => {
                        e.persist();
                        setBody((old) => ({ ...old, answer: e.target.value }))
                    }} className="normal-input mt-1" />
                </Label>
            </div>
            {loader ? <Loader /> : <Button className="bg-primary mt-5" size="large" onClick={handleSubmit}>Submit</Button>}
        </div>

        {
            data.Successful && <>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard title="Total Words" value={data.word_count}>
                        <RoundIcon
                            icon={QuestionIcon}
                            iconColorClass="text-orange-500 dark:text-orange-100"
                            bgColorClass="bg-orange-100 dark:bg-orange-500"
                            className="mr-4"
                        />
                    </InfoCard>
                </div>
                <Card className="mb-8 shadow-md">
                    <CardBody>
                        <p className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: data.Reply }} />
                    </CardBody>
                </Card>
            </>
        }

    </div>
}