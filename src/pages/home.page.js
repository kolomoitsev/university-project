import React from "react";
import axios from 'axios'
import {Header, ProjectBlock, CreateNewProject, Footer} from "../components/componets";

import '../App.css';

const token = localStorage.getItem('token')

class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            templates: [],
            token: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_SERVER}/structures/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then( res => {
                this.setState(prev => ({
                    ...prev,
                    templates: res.data.results,
                }))
            })
    }

    render() {
        return (
            <>
                <Header/>
    
                <div className="container mt-3">
    
                    <h2 className="mb-3 font-weight-bold ">Last templates</h2>
    
                    <div className="row">
                        { this.state.templates.length > 0 && this.state.templates.map(item => <ProjectBlock key={item.id} data={item}/>) }
                    </div>
    
                </div>
    
                <CreateNewProject/>
    
                <Footer/>
    
            </>
        )
    }

};

export default HomePage
