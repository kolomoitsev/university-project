import React from "react";
import '../App.css'
import {Footer, Header, HistoryTable} from "../components/componets";


const ParseHistoryPage = () => {
    return (
        <>
            <Header/>


            <div className="container main">
                <h2 className="font-weight-bold mt-3 mb-4">Parse history</h2>


                <HistoryTable/>

            </div>




            <Footer/>
        </>
    )
}

export default ParseHistoryPage
