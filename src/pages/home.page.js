import React from "react";

import {Header, ProjectBlock, CreateNewProject, Footer} from "../components/componets";

import '../App.css';

const HomePage = () => {

    const data = [
        {
            img: 'https://rojo-studio.com/wp-content/uploads/project-img-5.jpg',
            title: 'AVpz task 1',
            description: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
            ready: false,
        },
        {
            img: 'https://rojo-studio.com/wp-content/uploads/project-img-5.jpg',
            title: 'AVpz task 2',
            description: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
            ready: false,
        },
        {
            img: 'https://rojo-studio.com/wp-content/uploads/project-img-5.jpg',
            title: 'AVpz task 3',
            description: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
            ready: true,
        },
        {
            img: 'https://rojo-studio.com/wp-content/uploads/project-img-5.jpg',
            title: 'AVpz task 4',
            description: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
            ready: true,
        }

    ];

    const TOKEN = localStorage.getItem('token');

    return (
        <>
            <Header/>

            <div className="container mt-3">

                <h2 className="mb-3 font-weight-bold ">Last projects</h2>

                <div className="row">
                    {
                        data && data.map(item => <ProjectBlock data={item}/>)
                    }
                </div>

            </div>

            <hr/>

            <CreateNewProject/>

            <Footer/>

        </>
    )
};

export default HomePage
