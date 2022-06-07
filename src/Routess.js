import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FirstPage from './FirstPage';
import Home from './Home';
import FetchDetails from './FetchDetails';

function Routess() {
    return (
        <Router>
            <Routes>
            <Route path = '/' element={<Home />} />
            <Route exact path = '/user' element={<FirstPage />} />
            <Route path = '/fetch' element={<FetchDetails />} />
            </Routes>
        </Router>
    )
}

export default Routess
