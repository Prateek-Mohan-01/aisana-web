import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom"

const Navbar = ({openNav, openNavHandle}) => {
    const navigation = useNavigate();
    const handleLogout = () => {
        window.sessionStorage.removeItem('UserData');
        navigation('/')
    };
    return (
        <div className="nav-head">
            <div className="d-block">
                {
                    !openNav && 
                    <a href="#" className="text-blue font-22 font-500"> Aisana Solutions</a>
                }
            </div>
            <div className="d-flex align-items-center gap-3">
                <a href="#" className="nav-icons"><IoMdNotifications/></a>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" variant='nav-dropdown'>
                        <span className='d-block font-18 me-2'><IoPerson /></span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >Settings</Dropdown.Item>
                        <Dropdown.Item >Profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
        </div>
    )
}

export default Navbar