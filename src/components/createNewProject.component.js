import React from "react";
import '../App.css'


const CreateNewProject = () => {
    return (
            <div className="container-fluid customBg pb-5 pt-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 mx-auto">
                            <h2 className="text-center font-weight-bold mt-3 mb-5">
                                Create new template
                            </h2>
                            <form>

                                <div className="form-group">
                                    <label htmlFor="inputTitle">Template name</label>
                                    <input type="email" className="form-control" id="inputTitle"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescription">Template description</label>
                                    <textarea className="form-control" id="inputDescription" rows="3"></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFile">Document image</label>
                                    <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span className="input-group-text">Upload</span>
                                            </div>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="inputGroupFile01" />
                                            <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn customBtn">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default CreateNewProject
