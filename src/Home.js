import React from 'react'
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div>
            <p> Home page</p>
            <NavLink to='/user' >Users </NavLink>
                        
        </div>
    )
}

export default Home
