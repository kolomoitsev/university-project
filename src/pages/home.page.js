import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import '../App.css';

const HomePage = () => {

    const TOKEN = localStorage.getItem('token')

    // if(!TOKEN){
    //     return(
    //         <Redirect to={'/auth'} />
    //     )
    // }

    return  (
        <div>
            Home page
        </div>
    )
}

export default HomePage
