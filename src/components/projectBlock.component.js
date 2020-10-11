import React from "react";
import '../App.css'

import img from '../assets/img/test_img.png'

const ProjectBlock = ({ data }) => {
    return (
        <div className="col-md-3">
            <div className="projectBlockItem">
                <a href="">

                    <span className="icon">

                        {
                            data.ready ? <i className='bx bxs-badge-check'></i> : <i className='bx bx-loader-circle bx-spin bx-flip-vertical'></i>
                        }

                    </span>

                    <img src={data.img} alt=""/>
                    <h5>{data.title}</h5>
                    <p>{data.description}</p>
                </a>
            </div>
        </div>
    )
}

export default ProjectBlock
