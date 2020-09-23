import React from "react";

import { ImgEditor } from "../components/componets";

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImgEditorPage = () => {
    return (
        <div>
            <ImgEditor
                border={5}
                fontColor="white"
                backColor="black"
                borderColor="green"
            />
        </div>
    )
}

export default ImgEditorPage