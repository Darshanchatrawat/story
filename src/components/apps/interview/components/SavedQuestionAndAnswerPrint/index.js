import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//components
import HeaderCard from "../../../../HeaderCard"
import moment from 'moment';
import ProfileWithAvatar from '../../../../ProfileWithAvatar';

//style
import styled from 'styled-components';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    flexGrow: 1
  }
});

// Create Document Component
const SavedQuestionAndAnswerPrint = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <HeaderCard hideCollapse={true} title={"Interview Questions and Answers"} desc={"Create lists of interview questions and answers based on a job title and the type of questions and interview you are looking for."} />

        {data.map((item, i) => {
          return (
            <>
              {i > 0 ? <hr className="my-7" /> : <div className="my-7" />}
              <div className="flex justify-between mb-2 items-end">
                <span className="font-semibold gray-label " style={{ fontSize: 14 }}>Updated on: {moment(item.updatedAt).format("DD MMMM YY")}</span>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-300 px-4 py-2 rounded-2xl" style={{ background: "var(--blue-gradient)" }}>
                  <h1 className="text-white font-semibold">{item?.job_title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{item.question}</span>
                <br></br>
              </div>

              <div className="flex items-center justify-between mt-3 mb-5">
                <ProfileWithAvatar label={"Created by:"} name={item?.created_by} />
                <ProfileWithAvatar label={"Updated by:"} name={item.updated_by || item.created_by} />
              </div>

              {item.answer ?
                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#EFF4FE' }}>
                  <span className="font-bold text-lg block mb-2" style={{ color: '#0C3469' }}>Answer:</span>
                  <DescText className="mt-4 font-semibold">{item.answer}</DescText>
                </div> : null
              }
              {item.review_answer ?
                <div className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#FFEDED' }}>
                  <span className="font-bold text-lg block mb-2" style={{ color: '#0C3469' }}>Review Answer:</span>
                  <DescText className="mt-4 font-semibold">{item.review_answer}</DescText>
                </div> : null
              }
            </>
          )
        })}
      </Page>
    </Document>
  );
}


const DescText = styled.span`

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    line-height: 24px;

    letter-spacing: -0.02em;

    color: #213241;

`;

export default SavedQuestionAndAnswerPrint;