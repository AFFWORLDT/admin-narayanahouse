// import axios from "axios";
// import { useEffect, useState } from "react";
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import AddIcon from '@mui/icons-material/Add';
// import { Button } from "@mui/material";
// import Modal from 'react-bootstrap/Modal';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import toast from "react-hot-toast";

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 100 },
//   { id: 'desc', label: 'Description', minWidth: 100 },
//   { id: 'manager', label: 'Manager', minWidth: 100 },
//   { id: 'country', label: 'Country', minWidth: 100 },
//   { id: 'category', label: 'Category', minWidth: 100 },
//   { id: 'description', label: 'Description', minWidth: 100 },
//   // { id: 'image_url', label: 'Image URL', minWidth: 100 },
//   { id: 'status', label: 'Status', minWidth: 100 },

//   { id: 'actions', label: 'Actions', minWidth: 100 },
// ];

// const Advitisors = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [show, setShow] = useState(false);
//   const [name, setName] = useState('');
//   const [desc, setDesc] = useState('');
//   const [manager, setManager] = useState('');
//   const [country, setCountry] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [statusCampagin, setStatusCampagin] = useState('');
//   const [advitisorData, setAdvitisorData] = useState([]);
//   const URL = process.env.REACT_APP_PROD_ADMIN_API;
//   const API_KEY = process.env.REACT_APP_API_KEY;
//   // Add these states at the beginning of your Advitisors component
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [selectedAdvitisor, setSelectedAdvitisor] = useState(null);


//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleNameChange = (event) => setName(event.target.value);
//   const handleDescChange = (event) => setDesc(event.target.value);
//   const handleManagerChange = (event) => setManager(event.target.value);
//   const handleCountryChange = (event) => setCountry(event.target.value);
//   const handleCategoryChange = (event) => setCategory(event.target.value);
//   const handleDescriptionChange = (event) => setDescription(event.target.value);
//   const handleImageUrlChange = (event) => setImageUrl(event.target.value);
//   const handleStatusCampaginChange = (event) => setStatusCampagin(event.target.value);






//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleDeleteAdvitisor = (data) => {
//     setSelectedAdvitisor(data);
//     setDeleteConfirmation(true);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const confirmDeleteAdvitisor = async () => {
//     const id = selectedAdvitisor?._id;
//     const res = await axios.delete(`${URL}/api/advitisor/${id}?api_key=${API_KEY}`);

//     console.log("this is Delete advitisor data", res);

//     if (res?.status === 204) {
//       toast.success("Advitisor Deleted Successfully");
//       advitisor_data();
//     }

//     setDeleteConfirmation(false); // Close the confirmation modal
//     setSelectedAdvitisor(null);
//   };


//   const advitisor_data = async () => {
//     try {
//       const url = `${URL}/api/advitisor/?api_key=${API_KEY}`;
//       const res = await axios.get(url);
//       setAdvitisorData(res.data);
//     } catch (error) {
//       console.log("Error While Getting Advitisor Data", error);
//     }
//   };

//   const addAdvitisor = async () => {
//     const data = {
//       name,
//       desc,
//       manager,
//       category,
//       country,
//       description,
//       image_url: imageUrl,
//       statusCampagin,
//     };

//     try {
//       const res = await axios.post(`${URL}/api/advitisor/?api_key=${API_KEY}`, data);

//       if (res.status === 201) {
//         handleClose();
//         advitisor_data();
//         setName('');
//         setDesc('');
//         setManager('');
//         setCountry('');
//         setCategory('');
//         setDescription('');
//         setImageUrl('');
//         setStatusCampagin('');
//         toast.success('Advitisor Added Successfully');
//       }
//     } catch (error) {
//       console.log("Error While Adding Advitisor", error);
//       toast.error('Error adding Advitisor');
//     }
//   };

//   useEffect(() => {
//     advitisor_data();
//   }, []);

//   return (
//     <>
//       <div style={{ width: "100%", padding: "10px", marginLeft: "3%", height: "100%" }}>
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center">Advitisor List</h1>
//             <Button sx={{ margin: "10px" }} onClick={handleShow} variant="contained" color="success">
//               <AddIcon /> Add Advitisor
//             </Button>
//             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//               <TableContainer sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                   <TableHead>
//                     <TableRow>
//                       {columns.map((column) => (
//                         <TableCell
//                           key={column.id}
//                           align="center"
//                           style={{ minWidth: column.minWidth }}
//                         >
//                           {column.label}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {advitisorData
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((row, index) => (
//                         <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                           {columns.map((column) => (
//                             <TableCell key={column.id} align="center">
//                               {column.id === 'actions' ? (
//                                 <Button variant="contained" color="error" onClick={() => handleDeleteAdvitisor(row)}>
//                                   Delete Advitisor
//                                 </Button>
//                               ) : (
//                                 row[column.id]
//                               )}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={advitisorData?.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </Paper>
//           </div>
//         </div>

//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>+ Add Advitisor</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Name"
//                   variant="outlined"
//                   value={name}
//                   onChange={handleNameChange}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Tag Line"
//                   variant="outlined"
//                   value={desc}
//                   onChange={handleDescChange}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Manager Name"
//                   variant="outlined"
//                   value={manager}
//                   onChange={handleManagerChange}
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
//                 <InputLabel>Select Category</InputLabel>
//                 <Select
//                   value={category}
//                   onChange={handleCategoryChange}
//                   placeholder='Select Category'
//                 >
//                   <MenuItem value="ecommerce">Ecommerce</MenuItem>
//                   <MenuItem value="bfsi">BFSI</MenuItem>
//                   <MenuItem value="banking">Banking</MenuItem>
//                   <MenuItem value="casino">Casino</MenuItem>
//                   <MenuItem value="cpl">CPL</MenuItem>
//                   <MenuItem value="cpr">CPR</MenuItem>
//                   <MenuItem value="cpd">CPS</MenuItem>
//                   <MenuItem value="cps">CPD</MenuItem>
//                   <MenuItem value="gambling">Gambling</MenuItem>
//                   <MenuItem value="crypto">CPD</MenuItem>
//                   <MenuItem value="survey">Survey</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Description"
//                   variant="outlined"
//                   value={description}
//                   onChange={handleDescriptionChange}
//                 />
//               </FormControl>

//               <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   placeholder="Enter Image Url"
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
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="contained" color="error" onClick={handleClose}>
//               Close
//             </Button>
//             <Button sx={{ margin: "10px" }} variant="contained" color="success" onClick={addAdvitisor}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Delete Advitisor</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             Are you sure you want to delete the Advitisor?
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="contained" color="error" onClick={confirmDeleteAdvitisor}>
//               Yes
//             </Button>
//             <Button sx={{ margin: "10px" }} variant="contained" onClick={() => setDeleteConfirmation(false)}>
//               No
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Advitisors;
