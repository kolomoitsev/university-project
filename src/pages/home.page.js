import React from "react";
import axios from 'axios';

import {Header, ProjectBlock, CreateNewProject, Footer} from "../components/componets";

import '../App.css';

const token = localStorage.getItem('token')

class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            templates: [],
            token: '',
            loading: false,
        }
    }

    componentDidMount() {

        this.setState(prev => ({
            ...prev,
            loading: true,
        }))


        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_SERVER}/structures/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                this.setState(prev => ({
                    ...prev,
                    templates: res.data.results,
                    loading: false
                }))
            })


    }

    checkLoading = () => {
        return (this.state.loading) ?
            <div className="loadingSpinner">
                <i className='bx bx-loader-circle bx-spin'>
                </i>
            </div>
             :
            null
    }


    render() {
        return (
            <>
                <Header/>

                {this.checkLoading()}

                {
                    (
                        this.state.templates.length ?
                            <div className="container mt-3">

                                <h2 className="mb-3 font-weight-bold ">Last templates</h2>


                                <div className="row">
                                    {this.state.templates.map(item => <ProjectBlock key={item.id} data={item}/>)}
                                </div>

                            </div>
                            : null
                    )
                }

                <CreateNewProject/>

                <Footer/>

            </>
        )
    }

}

export default HomePage

