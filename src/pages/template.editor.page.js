import React from "react";

import { ImgEditor, Header, Footer } from "../components/componets";

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateEditorPage = () => {
    return (
        <div>
            <Header />
            <div className="main">
                <div className="container mt-3">
                    <div className="row">
                        <h2 className="mb-3 font-weight-bold ">Edit template</h2>
                    </div>
                </div>
                <ImgEditor
                    border={5}
                    fontColor="white"
                    backColor="black"
                    borderColor="#6979F8"
                />
            </div>
            <Footer />
        </div>
    )
}

export default TemplateEditorPage