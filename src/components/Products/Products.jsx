import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

const Products = () => {
    const element = document.getElementById('loading-container');
    const [productList, setProductList] = useState([])
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [editProduct, setEditProduct] = useState('');

    const handleAddProductClose = () => {
        setAddShow((prev) => !prev)
    };
    const handleAddProductOpen = () => {
        setAddShow((prev) => !prev)
    };  

    
    const handleAddingProduct = async(event) => {
        event.preventDefault();
        element.style.display = 'flex';
        try{
            let name = document.getElementById('p-name').value;
            const response = await fetch('/api/PRODUCT/', {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "product"   : name,
                    "customerid": 1
                })
            })
            const result = await response.json();
            if(response.status === 200) {
                setAddShow((prev) => !prev)
                element.style.display = 'none';
                products();
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }


    const handleEditProductClose = () => {
        setEditShow((prev) => !prev)
    };

    const handleEditProduct = (data) => {
        setEditProduct((prev) => prev = data)
        setEditShow((prev) => !prev)
    };  

    const handleEditingProduct = async(event) => {
        event.preventDefault();
        element.style.display = 'flex';
        try {
            const response = await fetch('/api/PRODUCT/'+`${(editProduct && editProduct !== null) ? editProduct.product_id : ""}`, {
                method: "PUT",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "product"   : (editProduct && editProduct !== null) ? editProduct.product : "",
                    "customerid": (editProduct && editProduct !== null) ? editProduct.customerid : "",
                })
            })
            const result = await response.json();
            if(response.status === 200) {
                setEditShow((prev) => !prev)
                element.style.display = 'none';
                products();
            }
            else{
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }


    const products = async() => {
        element.style.display = 'flex';
        try {
            const response = await fetch('/api/PRODUCT/1', {
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json",
                },
            })
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

    useEffect(() => {
        products();
    },[])

    return (
        <div className="m-4">
            <div className="main-block">
                <div className="p-2">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h1 className="title">
                            <span>Products</span> 
                        </h1>
                        <a href="#" className="table-icons-add" onClick = {() => {handleAddProductOpen() }} >
                            <span className="icon"><IoIosAddCircle /></span>
                            <span className="icon-text">Add Product</span>
                        </a>
                    </div>
                    

                    <div className="border p-2 table-responsive rounded">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (productList && productList.length > 0) ?
                                        productList.map((value,index)=> {
                                            return(
                                                <tr key={index} className='align-middle'>
                                                    <td>{value.product}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            
                                                            <a href="#" className="d-block table-icons" onClick = {() => {handleEditProduct(productList[index]) }}>
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
            <Modal show={addShow} onHide={handleAddProductClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleAddingProduct(event); } }>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="p-name" className="form-label"> Product Name</label>
                                <input type="text" name="p-name" id="p-name" className="form-control" placeholder="Product Name" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {handleAddProductClose()}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={handleEditProductClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit = {(event) => { handleEditingProduct(event); } }>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="p-name" className="form-label"> Product Name</label>
                                <input type="text" name="p-name" id="p-name" className="form-control" placeholder="Product Name" onChange={(event) => setEditProduct((editProduct) => {return {...editProduct, ['product'] : event.target.value}} )} value={editProduct.product}/>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            <button type="submit" className="btn btn-success">Submit</button>
                            <button type="reset" className="btn btn-warning" onClick={() => {handleEditProductClose()}}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Products