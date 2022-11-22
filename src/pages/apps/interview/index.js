import React, { useState, useEffect, useRef } from 'react'


import {
  Button, Card,
} from '@windmill/react-ui'

//components
import GenerateInterviewQuestions from "./components/GenerateInterviewQuestions"
import SimilarQuestions from "./components/SimilarQuestions"
import Saved from "./components/Saved"



import HeaderCard from "../../../components/HeaderCard"
import Accordion from "../../../components/Accordion"
import Tabs from '../../../components/Tabs'

///validation
import { validationCheck } from "../../../utils/validationCheck";

//history
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'


function App1() {

  const [bodySimilar, setSimilarBody] = useState({
    "job_title": "",
    "no_of_questions": "",
    "extra_instructions": ""
  });

  //tab
  const [active, setActive] = useState({ title: "CREATE", id: "create" });
  const [open, setOpen] = useState(false);


  useEffect(() => {
    let { job_title, question } = bodySimilar;
    let data = validationCheck({ job_title, question });

    if (data.status) {
      if (typeof window != "undefined") {
        window.scrollTo({ top: 1000000000000000, behavior: 'smooth' });
      }
      setOpen(true);
    }
  }, [bodySimilar]);


  //-------------------- switch tabs ------------
  const location = useLocation();

  useEffect(() => {
    let tab = location.search;
    if (!tab.includes("tab")) return;

    if (tab.includes("tab=saved")) {
      setActive({ title: "SAVED", id: "saved" });
    } else if (tab.includes("tab=create")) {
      setActive({ title: "CREATE", id: "create" });
    }
  }, [location])

  return (
    <>

      <div className="sm:mt-10 mt-5 "></div>
      <HeaderCard title={"Interview Questions and Answers"} desc={"Create lists of interview questions and answers based on a job title and the type of questions and interview you are looking for."} />

      <Tabs list={[
        { title: "CREATE", id: "create" },
        { title: "SAVED", id: "saved" },
      ]} active={active} setActive={setActive} style={{ marginTop: "1rem" }} />


      <Card hidden={active.id != "create"} className="mt-8 shadow-md p-5 mb-10">
        <GenerateInterviewQuestions setSimilarBody={setSimilarBody} />

        <hr className='my-5' />
        <Accordion title={"SIMILAR INTERVIEW QUESTION AND ANSWERS"} Component={<SimilarQuestions bodySimilar={bodySimilar} />} open={open} setOpen={setOpen} />
      </Card>

      {active.id == "saved" && <Card className="mt-8 shadow-md p-5 mb-10">
        <Saved setSimilarBody={setSimilarBody} />
      </Card>}

    </>
  )
}


export default App1
