import React from 'react'
import { GrMenu } from "react-icons/gr";
import { IoMdPricetags } from "react-icons/io";
import { SiWebpack } from "react-icons/si";
import { TbBrandDatabricks } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

const Sidebar = ({openNav, openNavHandle}) => {
    return (
        <aside id="sidebar" className= {`${(openNav) ? "expand" : ""}`}>
            <div className="sidelogo-block">
                <button className="toggle-btn" type="button" onClick={openNavHandle}>
                    <span><GrMenu /></span>
                </button>
                <div className="sidebar-logo">
                    <a href="#" >Aisana Solutions</a>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <NavLink activeclassname = {'active'} className="sidebar-link" to = "/admin/home">
                        <i><AiFillHome /></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink activeclassname={'active'} className="sidebar-link" to = "/admin/sites">
                        <i><SiWebpack /></i>
                        <span>Sites</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink activeclassname= {'active'} className="sidebar-link" to = "/admin/products" >
                        <i><TbBrandDatabricks /></i>
                        <span>Products</span>
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink activeclassname={'active'} className="sidebar-link" to = "/admin/pricing">
                        <i><IoMdPricetags /></i>
                        <span>Pricing</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar