import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//components
import HeaderCard from "../../../../HeaderCard"

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
const QuestionAndAnswerPrint = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <HeaderCard title={"Interview Questions and Answers"} desc={"Create lists of interview questions and answers based on a job title and the type of questions and interview you are looking for."} /> */}
        {data.map((item, index) => {
          return (
            <View style={styles.section}>
              <hr className="my-7" />

              {/* Question */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{item.id}: </span>
                <span className="text-lg font-semibold">{item.question}</span>
                <br></br>
              </div>

              {/* Answer Tab */}
              <div hidden={!item.answer} className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#EFF4FE' }}>
                <span className="font-bold text-lg block" style={{ color: '#0C3469' }}>Answer:</span>
                <span className="mt-4 font-semibold">{item.answer}</span>
              </div>

              {/* Answer Review Tab */}
              <div hidden={!item.review_answer} className="text-sm mt-2 p-4 rounded-lg" style={{ background: '#FFEDED' }}>
                <span className="font-bold text-lg block" style={{ color: '#0C3469' }}>Review Answer:</span>
                <span className="mt-4 font-semibold">{item.review_answer}</span>
              </div>
            </View>
          )
        })}
      </Page>
    </Document>
  );
}

export default QuestionAndAnswerPrint;