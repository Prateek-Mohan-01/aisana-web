import React, { useEffect, useState } from 'react'
import Moment from 'moment';
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

const Pricing = () => {
    const element = document.getElementById('loading-container');
    const [productList, setProductList] = useState([])
    const [siteList, setSiteList] = useState([])
    const [tableData, setTableData] = useState([])
    const [selectData, setSelectData] = useState([])
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [addFormData, setAddFormData] = useState(false);
    const [editFormData, setEditFormData] = useState(false);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSelectData((selectData) => { return{
            ...selectData,
            [name] : value
        } })
    }

    const handleResult = async() => {
        try{
            element.style.display = 'flex';
            const response = await fetch('/api/PRICINGMAP/list',{
                method: "Post",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "site_id"       : (selectData && selectData !== null) ? selectData.siteid : "",
                    "product_id"    : (selectData && selectData !== null) ? selectData.productid : "",
                    "date_id"       : (selectData && selectData !== null) ? Moment(selectData.fromdate).format('MMDDYYYY') : "" 
                })
            });
            const result = await response.json();
            if(response.status === 200) {
                setTableData(result)
                element.style.display = 'none';
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }

    const handleAddingPriceChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddFormData((addFormData) => { return{
            ...addFormData,
            [name] : value
        } })
    }
    const handleAddingPrice = async(event) => {
        event.preventDefault();
        const response = await fetch('/api/dummyPricingMaps/',{
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                "siteid"    : (addFormData && addFormData !== null) ? addFormData.ma_siteid : "",
                "productid" : (addFormData && addFormData !== null) ? addFormData.ma_productid : "",
                "date"      : (addFormData && addFormData !== null) ? addFormData.ma_fromdate : "",
                "dailyrate" : (addFormData && addFormData !== null) ? addFormData.ma_rate : "",
            })
        });
        const result = await response.json();
        if(response.status === 200) {
            setAddShow(false)
        }
    }

    const handleEditPriceChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditFormData((editFormData) => { return{
            ...editFormData,
            [name] : value
        } })
    }

    const handleEditPrice = (data) => {
        console.log(data)
        setEditFormData((editFormData) => { return{
            ...editFormData,
            ['me_siteid'] : data.siteid,
            ['me_productid'] : data.productid,
            ['me_fromdate'] : data.date,
            ['me_rate'] : data.dailyrate,
            ['me_dateid'] : data.dateid

        }})
        setEditShow(true);
    }

    const handleEditingPrice = async(event) => {
        event.preventDefault();
        let param = '';
        param+=(editFormData && editFormData !== null) ? editFormData.me_siteid : "";
        param+='/';
        param+=(editFormData && editFormData !== null) ? editFormData.me_productid : "";
        param+='/'
        param+=(editFormData && editFormData !== null) ? editFormData.me_dateid : "";

        const response = await fetch('/api/dummyPricingMaps/'+`${param}`,{
            method: "PUT",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                "siteid"    : (editFormData && editFormData !== null) ? editFormData.me_siteid : "",
                "productid" : (editFormData && editFormData !== null) ? editFormData.me_productid : "",
                "date"      : (editFormData && editFormData !== null) ? editFormData.me_fromdate : "",
                "dailyrate" : (editFormData && editFormData !== null) ? editFormData.me_rate : "",
            })
        });
        const result = await response.json();
        if(response.status === 200) {
            setEditShow(false)
        }
    }

    const getProducts = async() => {
        try{
            element.style.display = 'flex';
            const response = await fetch('/api/PRODUCT/1',{
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if(response.status === 200) {
                setProductList(result)
                element.style.display = 'none';
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }

    const getSites = async() => {
        try{
            element.style.display = 'flex';
            const response = await fetch('/api/SITE/1',{
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if(response.status === 200) {
                setSiteList(result);
                element.style.display = 'none';
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }

    useEffect(() => {
        getProducts();
        getSites();
    },[])

    return (
        <div className="m-4">
            <div className="main-block">
                <div className="p-2">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h1 className="title">
                            <span>Pricing Product </span> 
                        </h1>
                        <a href="#" className="table-icons-add" onClick = {() => {setAddShow(true)}} >
                            <span className="icon"><IoIosAddCircle /></span>
                            <span className="icon-text">Add Price Product</span>
                        </a>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="productid" className='form-label'>Product Name</label>
                                <select name="productid" id="productid" className='form-select' onChange={(e) => handleChange(e)}>
                                    <option value="" >Select Product </option>
                                    {
                                        (productList && productList.length > 0) &&
                                            productList.map((value,index) => {
                                                return(
                                                    <option value = {value.product_id} key = {index}> {value.product}</option>
                                                )
                                            })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="siteid" className='form-label'>Site Name</label>
                                <select name="siteid" id="siteid" className='form-select' onChange={(e) => handleChange(e)} >
                                    <option value="" >Select Site </option>
                                    {
                                        (siteList && siteList.length > 0) &&
                                            siteList.map((value,index) => {
                                                return(
                                                    <option value = {value.siteid} key = {index}> {value.sitename}</option>
                                                )
                                            })
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="fromdate" className='form-label'>From Date</label>
                                <input type="date" name="fromdate" id="fromdate" className='form-control' placeholder="From Date" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <div className="mb-3">
                                    <button type="button" className="btn btn-success" onClick={() => handleResult()}>Search</button>
                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-warning" >Clear</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="border rounded p-2 table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr className='align-middle'>
                                        <th className='text-green'>Date</th>
                                        <th className='text-green'>SiteName</th>
                                        <th className='text-green'>Product</th>
                                        <th className='text-green'>Rate</th>
                                        <th className='text-green'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (tableData && tableData.length > 0) ?
                                            tableData.map((value,index) => {
                                                return(
                                                    <tr className='align-middle' key = {index}>
                                                        <td>{Moment(value.date).format("MM-DD-YYYY")}</td>
                                                        <td>{value.sitename}</td>
                                                        <td>{value.productname}</td>
                                                        <td>{value.dailyrate}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-3">
                                                                
                                                                <a href="#" className="d-block table-icons" onClick={() => {handleEditPrice(tableData[index])}}>
                                                                    <FaEdit />
                                                                </a>
                                                                <a href="#" className="d-block table-icons">
                                                                    <MdDelete />
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            <tr className='align-middle'>
                                                <td colSpan={5}> No Data Found</td>
                                            </tr>
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Modal show={addShow} onHide={() => setAddShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Pricing Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleAddingPrice(event); } }>
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="ma_productid" className='form-label'>Product Name</label>
                                    <select name="ma_productid" id="ma_productid" className='form-select' onChange={(event) => {handleAddingPriceChange(event) }}>
                                        <option value="" >Select Product </option>
                                        {
                                            (productList && productList.length > 0) &&
                                                productList.map((value,index) => {
                                                    return(
                                                        <option value = {value.product_id} key = {index}> {value.product}</option>
                                                    )
                                                })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="ma_siteid" className='form-label'>Site Name</label>
                                    <select name="ma_siteid" id="ma_siteid" className='form-select' onChange={(e) => handleAddingPriceChange(e)} >
                                        <option value="" >Select Site </option>
                                        {
                                            (siteList && siteList.length > 0) &&
                                                siteList.map((value,index) => {
                                                    return(
                                                        <option value = {value.siteid} key = {index}> {value.sitename}</option>
                                                    )
                                                })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="ma_fromdate" className='form-label'>From Date</label>
                                    <input type="date" name="ma_fromdate" id="ma_fromdate" className='form-control' placeholder="From Date" onChange={(e) => handleAddingPriceChange(e)} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="ma_rate" className='form-label'>Rate</label>
                                    <input type="text" name="ma_rate" id="ma_rate" className='form-control' placeholder="Rate" onChange={(e) => handleAddingPriceChange(e)} />
                                </div>
                            </div>
                            
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {setAddShow(false)}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>


            <Modal show={editShow} onHide={() => setEditShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Pricing Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleEditingPrice(event); } }>
                        <div className="row">
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="me_productid" className='form-label'>Product Name</label>
                                    <select name="me_productid" id="me_productid" className='form-select' onChange={(event) => {handleEditPriceChange(event) }}  value = {(editFormData && editFormData !== null) ? editFormData.me_productid : ""}>
                                        <option value="" >Select Product </option>
                                        {
                                            (productList && productList.length > 0) &&
                                                productList.map((value,index) => {
                                                    return(
                                                        <option value = {value.product_id} key = {index}> {value.product}</option>
                                                    )
                                                })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="me_siteid" className='form-label'>Site Name</label>
                                    <select name="me_siteid" id="me_siteid" className='form-select' onChange={(e) => handleEditPriceChange(e)}  value = {(editFormData && editFormData !== null) ? editFormData.me_siteid : ""}>
                                        <option value="" >Select Site </option>
                                        {
                                            (siteList && siteList.length > 0) &&
                                                siteList.map((value,index) => {
                                                    return(
                                                        <option value = {value.siteid} key = {index}> {value.sitename}</option>
                                                    )
                                                })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="me_fromdate" className='form-label'>From Date</label>
                                    <input type="date" name="me_fromdate" id="me_fromdate" className='form-control' placeholder="From Date" onChange={(e) => handleEditPriceChange(e)} value = {(editFormData && editFormData !== null) ? editFormData.me_fromdate : ""} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="me_rate" className='form-label'>Rate</label>
                                    <input type="text" name="me_rate" id="me_rate" className='form-control' placeholder="Rate" onChange={(e) => handleEditPriceChange(e)} value = {(editFormData && editFormData !== null) ? editFormData.me_rate : ""} />
                                </div>
                            </div>
                            
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {setEditShow(false)}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Pricing