import React from 'react'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

function ExportExcelFile({ csvData, fileName,download }) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }
    if(download) return exportToCSV(csvData,fileName);

    // Export button for exporting that particular page's data in csv
    return (
        <button onClick={(e) => exportToCSV(csvData, fileName)}>Export</button>
    )
}

export default ExportExcelFile