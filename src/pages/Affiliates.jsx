import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Table from '@mui/material/Table';
import Modal from 'react-bootstrap/Modal';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import { getResFromLocalStorage } from "../service/localstorage";
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PauseIcon from '@mui/icons-material/Pause';
import { fontWeight } from '@mui/system';
import toast, { Toaster } from 'react-hot-toast';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import AddIcon from '@mui/icons-material/Add';

import TextField from '@mui/material/TextField';


const Affiliates = () => {

    const URL = process.env.REACT_APP_PROD_ADMIN_API;
    const [pageNo, setPageNo] = useState(1);
    const [affiliatedata, setAffiliateData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageData, setPageData] = useState([]);

    const [newData, setNewData] = useState({
        name: "",
        email: "",
        bio: "",
        affiliate_id: "",
        level: "",
        iframe_campaign_id: "",

    });

    const [level, setLevel] = useState("");
    const [iframe_campaign_id, setIframe_campaign_id] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [affiliate_id, setAffiliate_id] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const getAffiliates = async () => {
        setLoading(true);
        const url = `${URL}/affiliate/?page=${pageNo}`;

        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }

        });
        console.log("affiliate data -->", res?.data);
        setAffiliateData(res?.data);

        setLoading(false);

    }

    const slicePage = () => {
        const startIndex = page * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, affiliatedata.length);
        // Ensure pageData is always within bounds of affiliatedata
        const dataForPage = affiliatedata.slice(startIndex, endIndex);
        setPageData(dataForPage);
    };

    const handlePreviousPage = () => {

        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        } else {
            setPageNo(1);
        }
    }

    const handleDelete = async (id) => {
        try {
            const url = `${URL}/affiliate/${id}`;
            const res = await axios.delete(url);
            if (res?.status === 200) {
                toast.success('Affiliate Deleted Successfully');
                getAffiliates();
            }


        } catch (error) {
            console.error('Error deleting affiliate:', error);
            toast.error('Error deleting affiliate');

        }
    }

    const handleEdit = async (data) => {

        // console.log("Edit Data -->", data);

        setNewData({
            affiliate_id: data?.affiliate_id,
            name: data.name,
            bio: data.bio,
            level: data.level,
            iframe_campaign_id: data.iframe_campaign_id,
            email: data.email

        })

        handleShow();
        console.log("new data -->", newData);



    }

    const updateAffiliate = async () => {
        try {
            console.log("new data -->", newData);
            const url = `${URL}/affiliate/${newData?.affiliate_id}`;

            const res = await axios.put(url, newData);
            // console.log("res -->", res);

            if (res?.status === 200) {
                toast.success(res?.data?.message);
                getAffiliates();
                handleClose();
            }



        } catch (error) {
            console.error('Error Updating affiliate:', error);
            toast.error('Error Updating affiliate');
        }
    }


    useEffect(() => {
        getAffiliates();
    }, []);

    useEffect(() => {
        getAffiliates();
    }, [pageNo]);

    useEffect(() => {
        const startIndex = page * rowsPerPage;
        const dataForPage = affiliatedata?.slice(startIndex, startIndex + rowsPerPage);
        setPageData(dataForPage);


    }, [page, rowsPerPage]);



    return (
        <div className='w-100 h-100 p-3 ' style={{ marginLeft: '2%' }} >
            <div className='d-flex justify-content-between' >
                <h2 className='text-center' >All Affiliates </h2>
                <h4 className='text-center mb-3'>
                    Page No : {pageNo}
                </h4>
            </div>
            <div className='d-flex justify-content-between mb-3 ' >
                <Button variant='contained' sx={{ marginBottom: '10px' }} onClick={handlePreviousPage} color='error' >Previous Page </Button>
                <Button variant='contained' onClick={() => setPageNo(pageNo + 1)} color='success'>Next Page</Button>
            </div>
            {/* </div> */}

            <TableContainer component={Paper}   >
                {
                    loading ? <LinearProgress /> : (
                        <>
                            <Table id="offers-table" sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }} >
                                        <TableCell align='center'>No.</TableCell>
                                        <TableCell align='center'>Name</TableCell>
                                        <TableCell align="center">Bio</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Iframe_campaign_id</TableCell>
                                        <TableCell align="center">Level</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                        <TableCell align="center">Remarks</TableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    {


                                        affiliatedata?.length > 0 ? (
                                            <>
                                                {

                                                    affiliatedata?.map((row, index) => (
                                                        <TableRow
                                                            key={row?.affiliate_id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            {/* i want to disply number from 1 */}

                                                            <TableCell align="center">{index + 1}</TableCell>
                                                            <TableCell align="center" >{row.name}</TableCell>
                                                            <TableCell align="center"  >{row?.bio === null ? "N/A" : row?.bio}</TableCell>
                                                            <TableCell align="center">{row?.email === null ? "N/A" : row?.email}</TableCell>
                                                            <TableCell align="center">{row?.iframe_campaign_id === null ? "N/A" : row?.iframe_campaign_id}</TableCell>
                                                            <TableCell align="center">{row?.level === null ? "N/A" : row?.level}</TableCell>
                                                            <TableCell align="center"><Button variant='contained' onClick={() => handleEdit(row)} > Edit</Button></TableCell>
                                                            <TableCell align="center"><Button variant='contained' color='error' onClick={() => handleDelete(row?.affiliate_id)} > Delete</Button></TableCell>

                                                        </TableRow>
                                                    )
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <h1>No Affiliates Found</h1>
                                        )
                                    }
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                component="div"
                                count={affiliatedata.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )
                }
            </TableContainer>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newData.name}
                                placeholder='Enter Name'
                                onChange={(event) =>
                                    setNewData({ ...newData, name: event.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newData.bio}
                                placeholder='Enter Bio'
                                onChange={(event) =>
                                    setNewData({ ...newData, bio: event.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder='Enter Email'
                                variant="outlined"
                                value={newData.email}
                                onChange={(event) =>
                                    setNewData({ ...newData, email: event.target.value })
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                placeholder='Enter Iframe Campaign Id'
                                variant="outlined"
                                value={newData.iframe_campaign_id}
                                onChange={(event) =>
                                    setNewData({ ...newData, iframe_campaign_id: event.target.value })
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel>Select Level</InputLabel>
                            <Select
                                value={newData.level}
                                onChange={(event) =>
                                    setNewData({ ...newData, level: event.target.value })
                                }
                                placeholder='Select Level'
                            >
                                <MenuItem value="silver">Silver</MenuItem>
                                <MenuItem value="gold">Gold</MenuItem>
                                <MenuItem value="diamond">Diamond</MenuItem>

                            </Select>
                        </FormControl>


                    </form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Close
                    </Button>
                    <Button sx={{ margin: '10px' }} variant="contained" color="success" onClick={updateAffiliate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>




            <Toaster />

        </div>
    )
}

export default Affiliates