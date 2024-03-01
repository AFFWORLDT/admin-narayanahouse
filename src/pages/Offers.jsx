// import React, { useState, useEffect } from 'react';
// import { Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import Table from '@mui/material/Table';
// import Modal from 'react-bootstrap/Modal';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import Paper from '@mui/material/Paper';
// import TableContainer from '@mui/material/TableContainer';
// import LinearProgress from '@mui/material/LinearProgress';

// import * as XLSX from 'xlsx';
// import { getResFromLocalStorage } from "../service/localstorage";
// import axios from 'axios';
// import CloudDoneIcon from '@mui/icons-material/CloudDone';
// import PauseIcon from '@mui/icons-material/Pause';
// import { fontWeight } from '@mui/system';
// import toast, { Toaster } from 'react-hot-toast';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';

// import AddIcon from '@mui/icons-material/Add';

// import TextField from '@mui/material/TextField';





// const Offers = () => {
//   const URL = process.env.REACT_APP_PROD_ADMIN_API;
//   const API_KEY = process.env.REACT_APP_API_KEY;
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [showEditCampaignModal, setShowEditCampaignModal] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [selectedCampaignForDeletion, setSelectedCampaignForDeletion] = useState(null);

//   const res = getResFromLocalStorage();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [pageData, setPageData] = useState([]);
//   const [status, setStatus] = useState("");
//   const [show, setShow] = useState(false);
//   const [name, setName] = useState('');
//   const [desc, setDesc] = useState('');
//   const [manager, setManager] = useState('');
//   const [country, setCountry] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [typeOffer, setTypeoffer] = useState('');
//   const [statusCampagin, setStatusCampagin] = useState('');
//   const [advitisorDeatils, setAdvitisorDeatils] = useState([]);
//   const [selectedAdvitisor_id, setSelectedAdvitisor_id] = useState();
//   const [offer_url, setOffer_url] = useState('');
//   const [advitisorID, setAdvitisorID] = useState();
//   const [deposit, setDeposit] = useState("");
//   const [Deposit, setDepositLarge] = useState("");
//   const [Registration, setRegistration] = useState("");
//   const [FTD, setFTD] = useState("");
//   const [Qualified, setQualified] = useState("");
//   const [campaginPhoto, setCampaginPhoto] = useState("");


//   var [event1_val, setEvent1_val] = useState();
//   var [event2_val, setEvent2_val] = useState();
//   var [event3_val, setEvent3_val] = useState();
//   var [event4_val, setEvent4_val] = useState();


//   const [newData, setNewData] = useState({
//     campaign_id: "",
//     name: "",
//     CampaignPhoto: "",
//     advitisor_id: "",
//     url: "",
//     description: "",
//     image_url: "",
//     status: "",
//   });




//   const handleNameChange = (event) => setName(event.target.value);
//   const handleDescChange = (event) => setDesc(event.target.value);
//   const handleOfferUrlChange = (event) => setOffer_url(event.target.value);
//   const handleCountryChange = (event) => setCountry(event.target.value);
//   const handleTypeofferChange = (event) => setTypeoffer(event.target.value);
//   const handleCategoryChange = (event) => setCategory(event.target.value);
//   const handleDescriptionChange = (event) => setDescription(event.target.value);
//   const handleImageUrlChange = (event) => setImageUrl(event.target.value);
//   const handleStatusCampaginChange = (event) => setStatusCampagin(event.target.value);
//   const handleCampaginPhoto = (event) => setCampaginPhoto(event.target.value);

//   const handleSelectedAdvitisorChange = (data) => setSelectedAdvitisor_id(data?.target?.value)





//   const [payoutVal, setPayoutVal] = useState();
//   const [isPayoutVal, setIsPayoutVal] = useState(false);


//   const showDeleteConfirmationDialog = (campaign) => {
//     setSelectedCampaignForDeletion(campaign);
//     setShowDeleteConfirmation(true);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };




//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   useEffect(() => {

//     fetchData();
//   }, [status]);



//   const addCamapgin = async () => {



//     // handleClose();
//     const data = {
//       advitisor_id: selectedAdvitisor_id,
//       name: name,
//       category: category,
//       country: country,
//       url: offer_url,
//       description: desc,
//       image_url: imageUrl,
//       status: statusCampagin,
//       type: typeOffer,
//       CampaignPhoto: campaginPhoto,
//       payouts: {
//         Registration: event1_val,
//         FTD: event2_val,
//         Qualified: event3_val,
//         Deposit: event4_val,
//       }



//     }

//     // console.log('Add Campagin clicked with data:', data);


//     const url = `${URL}/campaign/?api_key=${API_KEY}`;
//     const res = await axios.post(url, data);
//     console.log("Add Campagin response only", res);
//     console.log('Add Campagin response.data this is:', res.data);
//     if (res?.status === 200) {
//       toast.success('Campagin Added Successfully')

//       setName('');
//       setDesc('');
//       setCountry('');
//       setCategory('');
//       setImageUrl('');
//       setStatusCampagin('');
//       setTypeoffer('');
//       setSelectedAdvitisor_id('');
//       setOffer_url('');
//       handleClose();
//       fetchData();
//       setDeposit('');
//       setDepositLarge('');
//       setRegistration('');
//       setFTD('');
//       setQualified('');
//       setEvent1_val('');
//       setEvent2_val('');
//       setEvent3_val('');
//       setEvent4_val('');



//     }

//   }


//   const advitisorDeatil = async () => {
//     try {

//       const url = `${URL}/api/advitisor/?api_key=${API_KEY}`;
//       const res = await axios.get(url);
//       // console.log("This is response from advitisor data", res?.data);
//       setAdvitisorDeatils(res?.data);
//     } catch (error) {

//     }
//   }

//   const fetchData = async () => {
//     try {
//       console.log("status-->", status);
//       const result = await axios.get(`${URL}/campaign/?page=1&status=${status}`);

//       console.log("offers data -->", result);
//       setData(result?.data);
//       setLoading(true);

//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }


//   };



//   const handleStatusChange = (event) => {
//     setStatus(event.target.value);
//   };

//   const handleDeleteCampaign = async (campaign) => {
//     try {
//       const id = campaign?._id;
//       const url = `${URL}/campaign/${id}?api_key=${API_KEY}`;
//       const res = await axios.delete(url);

//       if (res?.status === 200) {
//         toast.success('Campaign Deleted Successfully');
//         fetchData();
//         setShowDeleteConfirmation(false);
//       }
//     } catch (error) {
//       console.error('Error Deleting Campaign:', error);
//       toast.error('Error Deleting Campaign');
//     }
//   };

//   const handleEditCampagin = (data) => {
//     console.log("edit campagin data sdkjfsjkdfksjdfn-->", data);
//     setNewData({
//       campaign_id: data?._id,
//       advitisor_id: advitisorID,
//       name: data?.name,
//       url: data?.url,
//       CampaignPhoto: data?.image_url,
//       description: data?.description,
//       image_url: data?.image_url,
//       status: data?.status,
//     });

//     setShowEditCampaignModal(true);
//   };

//   const updateCampaign = async () => {
//     try {
//       const url = `${URL}/campaign/?api_key=${API_KEY}`;
//       const res = await axios.put(url, newData);

//       if (res?.status === 200) {
//         toast.success('Campaign Updated Successfully');
//         fetchData(); // Fetch updated data after successful update
//         setShowEditCampaignModal(false); // Close the modal after successful update
//       }
//     } catch (error) {
//       console.error('Error updating campaign:', error);
//       toast.error('Error updating campaign');
//     }
//   };








//   useEffect(() => {
//     advitisorDeatil();
//     const startIndex = page * rowsPerPage;
//     const dataForPage = data.slice(startIndex, startIndex + rowsPerPage);
//     setPageData(dataForPage);
//   }, [page, rowsPerPage, data]);

//   return (
//     <>
//       <div style={{ width: "100%", padding: "10px", marginLeft: "3%", height: "100%" }}>

//         <Button sx={{ margin: "10px" }} onClick={handleShow} variant="contained" color="success" > <AddIcon /> Add Campagin</Button>
//         <FormControl sx={{ width: 200 }}>
//           <InputLabel id="demo-simple-select-label">All Offers</InputLabel>
//           <Select
//             defaultValue=""
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={status}
//             onChange={handleStatusChange}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="paused">Paused</MenuItem>
//             <MenuItem value="expired">Expired</MenuItem>
//             <MenuItem value="active">Active</MenuItem>
//           </Select>
//         </FormControl>
//         <TableContainer component={Paper}>
//           <Table id="offers-table" sx={{ minWidth: 550 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Offers</TableCell>
//                 <TableCell align="center">Category</TableCell>
//                 <TableCell align="center">Description</TableCell>
//                 <TableCell align="center">Country</TableCell>
//                 <TableCell align="center">Status</TableCell>
//                 <TableCell align="center">Edit</TableCell>
//                 <TableCell align="center">Action</TableCell>

//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 pageData?.length > 0 ? (
//                   pageData.map((row) => (
//                     <TableRow
//                       key={row.name}
//                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                       <TableCell component="td" scope="row">{row.name}</TableCell>
//                       <TableCell align="center">{row?.category === null ? "N/A" : row?.category}</TableCell>
//                       <TableCell align="center">{row?.description === null ? "N/A" : row?.description}</TableCell>
//                       <TableCell align="center">{row?.country === null ? "N/A" : row?.country}</TableCell>
//                       <TableCell align="center">
//                         {row?.status === "active" ? (
//                           <CloudDoneIcon style={{ color: '#32e620' }} />
//                         ) : row?.status === "paused" ? (
//                           <PauseIcon style={{ color: '#FF0000' }} />
//                         ) : row?.status === "expired" ? (
//                           <AccessTimeIcon style={{ color: '#FFA500' }} />
//                         ) : null}
//                         {"   "}
//                         <span style={{ fontWeight: 700 }}>{row?.status} </span>
//                       </TableCell>
//                       <TableCell align="center"><Button variant='contained' onClick={() => handleEditCampagin(row)} >Edit Camapgin</Button></TableCell>
//                       <TableCell align="center">
//                         <Button
//                           variant='contained'
//                           color="error"
//                           onClick={() => showDeleteConfirmationDialog(row)}
//                         >
//                           Delete Campaign
//                         </Button>
//                       </TableCell>

//                     </TableRow>
//                   ))
//                 ) : null
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     <LinearProgress />
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 50, 100]}
//             component="div"
//             count={data.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>


//         <Modal onClose={() => setIsPayoutVal(false)} open={isPayoutVal}>
//           <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', boxShadow: 24, p: 2, borderRadius: '8px', width: '90%' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell className='text-center'>Reg</TableCell>
//                   <TableCell className='text-center'>Ftd</TableCell>
//                   <TableCell className='text-center'>deposite</TableCell>
//                   <TableCell className='text-center'>Deposite</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow style={{ backgroundColor: '#f2f2f2' }}>
//                   <TableCell className='text-center' >{payoutVal?.reg ? payoutVal?.reg : "N/A"}</TableCell>
//                   <TableCell className='text-center' >{payoutVal?.ftd ? payoutVal?.ftd : "N/A"}</TableCell>
//                   <TableCell className='text-center' >{payoutVal?.deposit ? payoutVal?.deposit : "N/A"}</TableCell>
//                   <TableCell className='text-center' >{payoutVal?.Deposit ? payoutVal?.Deposit : "N/A"}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Box>
//         </Modal>

//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton >
//             <Modal.Title >+ Add Campagin</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Select Advitisor</InputLabel>
//                 <Select
//                   value={selectedAdvitisor_id}
//                   onChange={handleSelectedAdvitisorChange}
//                   placeholder='Select Advitisor'
//                 >
//                   {
//                     advitisorDeatils?.map((data) => {
//                       return <MenuItem value={data?._id}>{data?.name}</MenuItem>
//                     })
//                   }


//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={name}
//                   placeholder='Enter Name'
//                   onChange={handleNameChange}
//                 />
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={offer_url}
//                   placeholder='Enter URL'
//                   onChange={handleOfferUrlChange}
//                 />
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Description'
//                   variant="outlined"
//                   value={desc}
//                   onChange={handleDescChange}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Campagin Photo'
//                   variant="outlined"
//                   value={campaginPhoto}
//                   onChange={handleCampaginPhoto}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Select Country</InputLabel>
//                 <Select
//                   value={country}
//                   onChange={handleCountryChange}
//                   placeholder='Select Country'
//                 >
//                   <MenuItem value="India">India</MenuItem>
//                   <MenuItem value="Australia">Australia</MenuItem>
//                   <MenuItem value="Banking">Banking</MenuItem>
//                   <MenuItem value="Canada">Canada</MenuItem>
//                   <MenuItem value="Brazil">Brazil</MenuItem>
//                   <MenuItem value="Vietnam">Vietnam</MenuItem>
//                   <MenuItem value="CPS">CPS</MenuItem>
//                   <MenuItem value="Russia">Russia</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Registration Value'
//                   variant="outlined"
//                   value={event1_val}
//                   onChange={(e) => setEvent1_val(e.target.value)}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Qualified Value'
//                   variant="outlined"
//                   value={event2_val}
//                   onChange={(e) => setEvent2_val(e.target.value)}
//                 />
//               </FormControl>


//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter FTD Value'
//                   variant="outlined"
//                   value={event3_val}
//                   onChange={(e) => setEvent3_val(e.target.value)}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Deposite Value'
//                   variant="outlined"
//                   value={event4_val}
//                   onChange={(e) => setEvent4_val(e.target.value)}
//                 />
//               </FormControl>





//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Select Category</InputLabel>
//                 <Select
//                   value={category}
//                   onChange={handleCategoryChange}
//                   placeholder='Select Category'
//                 >
//                   <MenuItem value="Ecommerce">Ecommerce</MenuItem>
//                   <MenuItem value="BFSI">BFSI</MenuItem>
//                   <MenuItem value="Banking">Banking</MenuItem>

//                   <MenuItem value="Casino">Casino</MenuItem>
//                   <MenuItem value="CPL">CPL</MenuItem>
//                   <MenuItem value="CPR">CPR</MenuItem>
//                   <MenuItem value="CPS">CPS</MenuItem>
//                   <MenuItem value="CPD">CPD</MenuItem>

//                   <MenuItem value="Gambling">Gambling</MenuItem>
//                   <MenuItem value="Crypto">CPD</MenuItem>
//                   <MenuItem value="Survey">Survey</MenuItem>


//                 </Select>
//               </FormControl>


//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder='Enter Image URL'
//                   variant="outlined"
//                   value={imageUrl}
//                   onChange={handleImageUrlChange}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={statusCampagin}
//                   placeholder='Select Status'
//                   onChange={handleStatusCampaginChange}
//                   variant="outlined"
//                 >
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="paused">Paused</MenuItem>
//                   <MenuItem value="expired">Expired</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Type</InputLabel>
//                 <Select
//                   value={typeOffer}
//                   placeholder='Select Type'
//                   onChange={handleTypeofferChange}
//                   variant="outlined"
//                 >
//                   <MenuItem value="Private">Private</MenuItem>
//                   <MenuItem value="Public">Public</MenuItem>
//                 </Select>
//               </FormControl>
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="contained" color="error" onClick={handleClose}>
//               Close
//             </Button>
//             <Button sx={{ margin: "10px" }} variant="contained" color="success" onClick={addCamapgin}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>


//         <Modal show={showEditCampaignModal}
//           handleClose={() => setShowEditCampaignModal(false)}>
//           <Modal.Header closeButton onClick={() => setShowEditCampaignModal(false)}>
//             <Modal.Title>+ Edit Campaign</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Select Advitisor</InputLabel>
//                 <Select
//                   value={selectedAdvitisor_id}
//                   // onChange={handleSelectedAdvitisorChange}
//                   placeholder="Select Advitisor"
//                   onChange={(event) =>
//                     setNewData({ ...newData, advitisor_id: event.target.value })
//                   }
//                 >
//                   {advitisorDeatils?.map((data) => (
//                     <MenuItem value={data?._id}>{data?.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={newData.name}
//                   placeholder="Enter Name"
//                   onChange={(event) =>
//                     setNewData({ ...newData, name: event.target.value })
//                   }
//                 />
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   value={newData.url}
//                   placeholder="Enter URL"
//                   onChange={(event) =>
//                     setNewData({ ...newData, url: event.target.value })
//                   }
//                 />
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Description"
//                   variant="outlined"
//                   value={newData.description}
//                   onChange={(event) =>
//                     setNewData({ ...newData, description: event.target.value })
//                   }
//                 />
//               </FormControl>


//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Image URL"
//                   variant="outlined"
//                   value={newData.image_url}
//                   onChange={(event) =>
//                     setNewData({ ...newData, image_url: event.target.value })
//                   }
//                 />
//               </FormControl>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={newData.status}
//                   placeholder="Select Status"
//                   onChange={(event) =>
//                     setNewData({ ...newData, status: event.target.value })
//                   }
//                   variant="outlined"
//                 >
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="paused">Paused</MenuItem>
//                   <MenuItem value="expired">Expired</MenuItem>
//                 </Select>
//               </FormControl>

//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="contained" color="error" onClick={() => setShowEditCampaignModal(false)}>
//               Close
//             </Button>
//             <Button
//               sx={{ margin: '10px' }}
//               variant="contained"
//               color="success"
//               onClick={updateCampaign}
//             >
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Deletion</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Are you sure you want to delete this campaign?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={() => handleDeleteCampaign(selectedCampaignForDeletion)}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>


//       </div>
//       <Toaster />
//     </>
//   );
// };

// export default Offers;