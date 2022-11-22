import { useState } from "react"
import { Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from "@windmill/react-ui";
//api
import { tableWord } from "../../../api/word"
import { useEffect } from "react";
import moment from "moment";

const TableWordAnalytics = () => {
    //data
    const [response, setresponse] = useState([]);
    const [data, setData] = useState([]);


    const [paginationData, setpaginationData] = useState({
        page: 1,
        resultsPerPage: 10,
        totalResults: response.length
    });

    let onPageChange = function (num) {
        setpaginationData({ ...paginationData, page: num });
    };

    useEffect(() => {
        if (response.length == 0) return;
        
        let { page, resultsPerPage } = paginationData;
        setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    }, [response, paginationData.page])

    const FetchData = async () => {
        let res = await tableWord();
        if (!res?.success) return;

        setresponse(res.data || []);
        setpaginationData({ ...paginationData, totalResults: res.data?.length || 0 });
    }

    useEffect(() => {
        FetchData();
    }, [])

    return <TableContainer>
        <Table>
            <TableHeader>
                <tr>
                    <TableCell>Date</TableCell>
                    <TableCell>Word Count</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>App</TableCell>
                </tr>
            </TableHeader>
            <TableBody>
                {data.map((item, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <span className="text-sm">{moment(item.date).format("Do MMM YY")}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{item.word}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{item.user?.name}</span>
                        </TableCell>
                        <TableCell>
                            <span className="text-sm">{item.app?.name}</span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <TableFooter>
            <Pagination
                totalResults={paginationData.totalResults}
                resultsPerPage={paginationData.resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
            />
        </TableFooter>
    </TableContainer>

};

export default TableWordAnalytics;