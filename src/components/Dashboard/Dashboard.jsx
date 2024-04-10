import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [sideWidth, setSideWidth] = useState(false);
    const handleMenu = () => { setSideWidth(prev => !prev); }

    return (
        <div className="container-fluid px-0">
            <div id="loading-container">
                <div className="loader"></div>
            </div>
            <div className="wrapper">
                <Sidebar openNav={sideWidth} openNavHandle={handleMenu} />
                <div className="main">
                    <Navbar openNav={sideWidth} openNavHandle={handleMenu} />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
