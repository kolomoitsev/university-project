import React, {useEffect, useState} from "react";

import {Header, ProjectBlock, CreateNewProject, Footer} from "../components/componets";

import axios from 'axios'

import '../App.css';

const TemplatesPage = () => {

    const TOKEN = localStorage.getItem('token');

    const [templates, setTemplates] = useState(null)

    useEffect( () => {

        const getTemplates = async () => {

            const { data : { results } } = await axios.get(`${process.env.REACT_APP_API_SERVER}/structures/`, {
                headers: {
                    'Authorization' : `Bearer ${TOKEN}`
                }
            })
                .catch(err => console.log(err))

            //results && console.log(results)

            results && setTemplates(results)

        }

        getTemplates()

    }, [templates])

    const deleteTemplate = (id) => {
        const index = templates.findIndex(item => item.id === id)
        const temps = templates
        temps.splice(index, 1)
        console.log(temps)
        setTemplates(temps)
        //this.forceUpdate()
        console.log(templates)
    }

    return (
        <>
            <Header/>

            <div className="container mt-3">

                <h2 className="mb-3 font-weight-bold ">All templates</h2>

                <div className="row">
                    {
                        templates && templates.map(item => <ProjectBlock deleteFunc={deleteTemplate} data={item}/>)
                    }
                </div>

            </div>

            <Footer/>

        </>
    )
};

export default TemplatesPage
