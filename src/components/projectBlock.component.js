import React from "react";
import '../App.css'
import { Link } from 'react-router-dom'

import img from '../assets/img/test_img.png'

const ProjectBlock = ({ data }) => {
    return (
        <div className="col-md-3 mb-3">
            <div className="projectBlockItem">
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
