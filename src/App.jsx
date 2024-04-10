import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Demo from './components/Demo/Demo';
import Sites from './components/Sites/Sites';
import Products from './components/Products/Products';
import Pricing from './components/Pricing/Pricing';

const userData = JSON.parse(window.sessionStorage.getItem('UserData'));

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                    <Route path="/admin/*" element={<Dashboard />} >
                        <Route path="home"  element={<Demo />} />
                        <Route path="sites" element={<Sites />} />
                        <Route path="products" element={<Products />} />
                        <Route path="pricing" element={<Pricing />} />
                    </Route>
            </Routes>
        </Router>
    );
}

export default App;
