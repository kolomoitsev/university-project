import React from "react";
import '../App.css'

import img from '../assets/img/test_img.png'

const ProjectBlock = ({ data }) => {
    return (
        <div className="col-md-3 mb-3">
            <div className="projectBlockItem">
                <a href="">
                    <img src={data.img} alt=""/>
                    <h5>{data.title}</h5>
                    <p>{data.description}</p>
                </a>
            </div>
        </div>
    )
}

export default ProjectBlock
