import React, { useEffect, useState } from 'react'
import Moment from 'moment';

const Demo = () => {

    const [productList, setProductList] = useState([])
    const [siteList, setSiteList] = useState([])
    const [dailyList, setDailyList] = useState([])
    const element = document.getElementById('loading-container');
    const [tableData, setTableData] = useState({
        "dateid"        : "",
        "date"          : "",
        "siteid"        : "",
        "site_name"     : "",
        "product_id"    : "",
        "product"       : "",
        "daily_rate"    : "",
        "fromdate"      : "",
        "todate"        : "",
    })

    const handleChange =  (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'siteid')
        {
            setTableData((tableData) => {return {...tableData, ['siteid'] : value, ['site_name']:event.target.selectedOptions[0].text }})
        } 
        else if(name === "productid")
        {
            setTableData((tableData) => {return {...tableData, ['product_id'] : value, ['product']:event.target.selectedOptions[0].text }})
        }
        else if(name === "fromdate"){
            setTableData((tableData) => {return {...tableData, ['fromdate'] : value}})
        }
        else {
            setTableData((tableData) => {return {...tableData, ['todate'] : value}})
        }
    }  

    const handleClear = () => {
        setTableData({"date" : [],"siteid" : "","sitename" : "","productid" : "","productname" : "","rate":"","fromdate":"","todate" : ""})
    }


    const getProducts = async() => {
        element.style.display = 'flex';
        try 
        {
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
            else
            {
                element.style.display = 'none';
            }
        }
        catch(e) {
            element.style.display = 'none';
        }
    }

    const getSites = async() => {
        element.style.display = 'flex';
        try
        {
            const response = await fetch('/api/SITE/1',{
                method: "GET",
                headers: 
                {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if(response.status === 200) {
                setSiteList(result)
                element.style.display = 'none';
            }
            else
            {
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }

    const handleCheck = async() => {
        
        element.style.display = 'flex';
        try{
            const response = await fetch('/api/dailyrate',{
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    "start_date" : (tableData && tableData !== null) && tableData.fromdate,
                    "end_date" : (tableData && tableData !== null) && tableData.todate,
                    "product_id" : (tableData && tableData !== null) && tableData.product_id,
                    "site_id" : (tableData && tableData !== null) && tableData.siteid,
                })
            });
            const result = await response.json();
            if(response.status === 200) {
                setDailyList(result)
                element.style.display = "none";
            }
            else
            {
                element.style.display = 'none';
            }
        }
        catch(e){
            element.style.display = 'none';
        }
    }

    const handleTableData = (index, e) => {
        setDailyList(dailyList => dailyList.map((item, j) => {
            if (j === index) {
              return { ...item, daily_rate : parseInt(e.target.value) };
            }
            return item;
        }));
    }
   
    const handlePush = async() => {
        element.style.display = "flex";
        let List = dailyList;
        setDailyList([])
        if(List && List.length > 0)
        {
            for( let i = 0; i < List.length; i++)
            {
                const response = await fetch('/api/push_daily_rate/',{
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({
                        "siteid" : List[i].siteid, 
                        "product_id": List[i].product_id, 
                        "date" : List[i].date, 
                        "daily_rate": parseFloat(List[i].daily_rate)
                    })
                });
                const result = await response.json();
                if(response.status === 200) {
                    console.log(result)
                }
            }
            
        }
        element.style.display = "none";
        handleCheck();
        
        
    }

    useEffect(() => {
        getProducts();
        getSites();
    },[])
    return (
        <div className="m-4">
            <div className="main-block">
                <div className="p-2">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="productid" className='form-label'>Product Name</label>
                                <select name="productid" id="productid" className='form-select' onChange={(e) => {handleChange(e)}} value = {tableData.productid} >
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

                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label htmlFor="siteid" className='form-label'>Site Name</label>
                                <select name="siteid" id="siteid" className='form-select' onChange={(e) => {handleChange(e)}} value = {tableData.siteid}>
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
                        
                        <div className="col-lg-4">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="fromdate" className='form-label'>From Date</label>
                                        <input type="date" name="fromdate" id="fromdate" className='form-control' placeholder="From Date" onChange={(e) => {handleChange(e)}} value = {tableData.fromdate}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="todate" className='form-label'>To Date</label>
                                        <input type="date" name="todate" id="todate" className='form-control' placeholder="To Date" onChange={(e) => {handleChange(e)}} value = {tableData.todate}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <div className="mb-3">
                                    <button type="button" className="btn btn-primary" onClick={() => {handleCheck()}}>Search</button>
                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-success" onClick={() => {handlePush()}}>Push</button>
                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-warning" onClick={() => {handleClear()}}>Clear</button>
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
                                        <th width="300" className='text-green'>Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (dailyList && dailyList.length > 0) ?
                                            dailyList.map((value,index) => {
                                                return(
                                                    <tr className='align-middle' key = {index}>
                                                        <td>{value.date}</td>
                                                        <td>{value.site_name}</td>
                                                        <td>{value.product}</td>
                                                        <td>
                                                            <input type="text" name={'rate_'+index } id={'rate_'+index} className='form-control' defaultValue = {value.daily_rate} onChange = {(event) => handleTableData(index, event)}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            <tr className='align-middle'>
                                                <td colSpan={4}> No Data Found</td>
                                            </tr>
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo