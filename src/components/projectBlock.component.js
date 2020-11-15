import React from "react";
import '../App.css'
import { Link } from 'react-router-dom'

import img from '../assets/img/test_img.png'
import axios from "axios";

const ProjectBlock = ({ data, deleteFunc }) => {

    const deleteStructure = (id) => {

        const deleteProposition = window.confirm(`Are you sure?`);

        if(deleteProposition){
            axios.delete(`${process.env.REACT_APP_API_SERVER}/structures/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => deleteFunc(id))
        }

    }

    return (
        <div className="col-md-3 mb-3">
            <div className="projectBlockItem">
                <div className="deleteItemBtn">
                    <span onClick={ () => deleteStructure(data.id) } >
                        <i className='bx bxs-trash'></i>
                    </span>
                </div>
                <Link to={`templates/${data.id}`}>
                    <img src={`http://127.0.0.1:8000${data.image}`} alt=""/>
                    <h5>{data.name}</h5>
                    <p>{data.description}</p>
                </Link>
            </div>
        </div>
    )
}

export default ProjectBlock
