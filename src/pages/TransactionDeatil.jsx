import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Select } from "antd";

import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
const { Option } = Select;

const columns = [
  { id: 'affiliate_name', label: 'Name', minWidth: 100 },
  { id: 'amount', label: 'Amount', minWidth: 100 },
  {
    id: 'approved',
    label: 'Approved',
    minWidth: 100,
  },
  {
    id: 'event',
    label: 'Event',
    minWidth: 100,
  },
  {
    id: 'initiated_at',
    label: 'Time',
    minWidth: 100,

  },
];


const TransactionDeatil = () => {

  const [campaginNames, setCampaginNames] = useState([]);
  const [completeInfo, setCompleteInfo] = useState([]);
  const [affiliateCompleteInfo, setAffiliateCompleteInfo] = useState([]);
  const [affiliateID, setAffiliateID] = useState(null);

  const [advitisorDetails, setAdvitisorDeatils] = useState();
  const [Selectedcampagin, setSelectedcampagin] = useState("");
  const [SelectedAffiliate, setSelectedAffiliate] = useState("");
  const [transactionData, setTransaction] = useState([]);
  const [affiliateTransactionData, setAffiliateTransaction] = useState([]);
  const [combinedTransactionData, setCombinedTransaction] = useState([]);


  const [pageNo, setPageNo] = useState(1);
  const [pageNoAffiliate, setPageNoAffiliate] = useState(1);
  const [approved, setApproved] = useState(false);
  const [statusCamapgin, setStatusCamapgin] = useState("");
  const [loading, setLoading] = useState(false);

  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const advitisor_id = Selectedcampagin?.advitisor_id;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const campaginData = async () => {
    try {
      const url = `${URL}/campaign/?page=${pageNo}`;
      const res = await axios.get(url);

      setCompleteInfo(res?.data);

    } catch (error) {
      console.log("Error While Getting campagin data", error);
    }
  }

  const getAffiliateData = async () => {
    try {
      const url = `${URL}/affiliate/?page=${pageNoAffiliate}`;
      const res = await axios.get(url);
      setAffiliateCompleteInfo(res?.data);
    } catch (error) {
      console.log("Error While Getting Affliate data", error);
    }
  }

  const getAdvitisorName = async () => {
    try {
      setLoading(true);
      const url = `${URL}/api/advitisor/${advitisor_id}?api_key=${API_KEY}`;
      const res = await axios.get(url);
      setAdvitisorDeatils(res?.data);
      setLoading(false);

    } catch (error) {
      console.log("Error While Getting Advitisor data", error);
    }
  }

  const getAffiliateNameById = (affiliateId) => {
    const matchedAffiliate = affiliateCompleteInfo.find(affiliate => affiliate.affiliate_id === affiliateId);
    return matchedAffiliate ? matchedAffiliate.name : 'N/A';
  };



  const getCombinedTransactionData = async () => {
    try {
      var url;
      console.log("Get Combined Transaction Data Called!!!")

      if (SelectedAffiliate?.affiliate_id && Selectedcampagin._id) {
        // Case 3: Both affiliate and campaign ids are available
        url = `${URL}/api/transaction/?affiliate_id=${SelectedAffiliate.affiliate_id}&campaign_id=${Selectedcampagin._id}&approved=${approved}&api_key=${API_KEY}`;
      } else if (SelectedAffiliate?.affiliate_id) {
        // Case 1: Only affiliate id is available
        url = `${URL}/api/transaction/?affiliate_id=${SelectedAffiliate.affiliate_id}&api_key=${API_KEY}`;
      } else if (Selectedcampagin._id) {
        // Case 2: Only campaign id is available
        url = `${URL}/api/transaction/?campaign_id=${Selectedcampagin._id}&approved=${approved}&api_key=${API_KEY}`;
      } else {
        console.alert("No valid parameters provided");
        return; // Or handle the case where neither affiliate nor campaign id is available
      }

      const res = await axios.get(url);
      const transactions = res?.data.map(transaction => ({
        ...transaction,
        affiliate_name: getAffiliateNameById(transaction.affiliate_id)
      }));
      setCombinedTransaction(transactions);
      console.log("This is final transaction data-->>>>", transactions);
    } catch (error) {
      console.log("Error While Getting Transaction data", error);
    }
  };
  const selectedCam = () => {
    console.log("THis is selected campagin ", Selectedcampagin);
  }

  useEffect(() => {
    selectedCam();
    campaginData();
    getAdvitisorName();
    getAffiliateData();
  }, [pageNo, Selectedcampagin]);

  return (
    <div style={{ width: "100%", padding: "10px", marginLeft: "3%", height: "100%" }}>

      <h1 className='text-center'> Transaction Details </h1>

      <div className='row'>

        <div className='col-md-4  ' style={{ display: "flex", justifyContent: "center" }}>
          <div className=" text-center m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select Campagin"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(index) => {
                setSelectedcampagin(completeInfo[index]);
              }}
            >
              {completeInfo?.map((c, index) => (
                <Option key={index} value={index}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className='col-md-4'>

          {
            <h3 className='text-center border p-1'>
              {Selectedcampagin === "" ? <p style={{ color: "#bfbfbf" }} > Your Selected Advitisor Here! </p> : (advitisorDetails?.name ? advitisorDetails?.name : <CircularProgress />)}
            </h3>
          }


        </div>



      </div>

      <div className='row mt-3'>

        <div className='col-md-4  ' style={{ display: "flex", justifyContent: "center" }}>
          <div className=" text-center m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select Affiliate"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(index) => {
                setSelectedAffiliate(affiliateCompleteInfo[index]);
                setAffiliateID(affiliateCompleteInfo[index]?.affiliate_id);
              }}
            >
              {affiliateCompleteInfo?.map((c, index) => (
                <Option key={index} value={index}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>



        </div>

        <div className='col-md-4'>
          {
            <h3 className='text-center border p-1'>
              {SelectedAffiliate === "" ? <p style={{ color: "#bfbfbf" }} >Your Selected Affiliate Here! </p> : (SelectedAffiliate?.name ? SelectedAffiliate?.name : <CircularProgress />)}
            </h3>
          }
        </div>

        <div className='col-md-4' style={{ display: "flex", justifyContent: "center", padding: "20px" }}>

          <Button variant='contained' onClick={() => getCombinedTransactionData()}>Get Transaction Data</Button>
        </div>
      </div>
      <div className='row m-3'>

        {combinedTransactionData.length > 0 ? (
          <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <h1 className='text-center'>Total Transactions </h1>
              <TableContainer
                sx={{
                  maxHeight:
                    440
                }}>
                <Table
                  stickyHeader
                  aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {/* Add the new column for sequence number */}
                      <TableCell key="No"> No</TableCell>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth:
                              column.minWidth
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {combinedTransactionData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {/* Generate the sequence number for each row */}
                            <TableCell key="No">{index + 1 + (page * rowsPerPage)}</TableCell>
                            {columns.map((column) => {
                              const value = row[column.id];

                              // Update rendering for the "Approved" column
                              const renderedValue = column.id === 'approved' ? (value ? <p style={{ color: "green" }}>Yes</p> : <p style={{ color: "red" }}> NO</p>) : value;





                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                >
                                  {column.format && typeof renderedValue === 'number'
                                    ? column.format(renderedValue)
                                    : renderedValue}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10,
                  25, 100]}
                component="div"
                count={combinedTransactionData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </>
        ) :
          (
            <></>
          )



        }




      </div>
    </div>
  )
}

export default TransactionDeatil