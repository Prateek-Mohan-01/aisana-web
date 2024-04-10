import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

const Sites = () => {
    const element = document.getElementById('loading-container');
    const [siteList, setSiteList] = useState([])
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [editSite, setEditSite] = useState('');

    const handleAddSiteClose = () => {
        setAddShow((prev) => !prev)
    };
    const handleAddSiteOpen = () => {
        setAddShow((prev) => !prev)
    };  

    
    const handleAddingSite = async(event) => {
        event.preventDefault();
        element.style.display = 'flex';
        try{
            let name = document.getElementById('s-name').value;
            const response = await fetch('/api/SITE/', {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "sitename"   : name,
                    "customerid": 1
                })
            })
            const result = await response.json();
            if(response.status === 200) {
                setAddShow((prev) => !prev)
                element.style.display = 'none';
                getSites();
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }


    const handleEditSiteClose = () => {
        setEditShow((prev) => !prev)
    };

    const handleEditSite = (data) => {
        setEditSite((prev) => prev = data)
        setEditShow((prev) => !prev)
    };  

    const handleEditingSite = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api/SITE/'+`${(editSite && editSite !== null) ? editSite.siteid : ""}`, {
                method: "PUT",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "sitename"   : (editSite && editSite !== null) ? editSite.sitename : "",
                    "customerid": (editSite && editSite !== null) ? editSite.customerid : "",
                })
            })
            const result = await response.json();
            if(response.status === 200) {
                setEditShow((prev) => !prev)
                element.style.display = 'none';
                getSites();
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
            const response = await fetch('/api/SITE/1', {
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            
            if(response.status === 200) {
                setSiteList(result)
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
        getSites();
    },[])

    return (
        <div className="m-4">
            <div className="main-block">
                <div className="p-2">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h1 className="title">
                            <span>Sites </span> 
                        </h1>
                        <a href="#" className="table-icons-add" onClick = {() => {handleAddSiteOpen() }} >
                            <span className="icon"><IoIosAddCircle /></span>
                            <span className="icon-text">Add Site</span>
                        </a>
                    </div>
                    

                    <div className="border p-2 table-responsive rounded">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Site Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (siteList && siteList.length > 0) ?
                                        siteList.map((value,index)=> {
                                            return(
                                                <tr key={index} className='align-middle'>
                                                    <td>{value.sitename}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            
                                                            <a href="#" className="d-block table-icons" onClick = {() => {handleEditSite(siteList[index]) }}>
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
                                        <tr><td colSpan={2}>No Data Found</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={addShow} onHide={handleAddSiteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleAddingSite(event); } }>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="s-name" className="form-label"> Site Name</label>
                                <input type="text" name="s-name" id="s-name" className="form-control" placeholder="Site Name" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {handleAddSiteClose()}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={handleEditSiteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleEditingSite(event); } }>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="p-name" className="form-label"> Site Name</label>
                                <input type="text" name="s-name" id="s-name" className="form-control" placeholder="Site Name" onChange={(event) => setEditSite((editSite) => {return {...editSite, ['sitename'] : event.target.value}} )} value={editSite.sitename}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {handleEditSiteClose()}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Sites