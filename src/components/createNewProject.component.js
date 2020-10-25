import React from "react";
import axios from 'axios'
import '../App.css'
import { bindMethods } from '../utils/bindMethods'


class CreateNewProject extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            image_file: null,
            lang: 'eng',
            error: '',
            token: localStorage.getItem('token')
        }

        bindMethods(this, ['handleInput', 'handleImage', 'handleSubmit'])
    }

    handleInput(e) {
        const { name, value } = e.target

        this.setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    handleImage(e) {
        const image_file = e.target.files[0]
        this.setState(prev => ({
            ...prev,
            image_file
        }))
    }

    handleSubmit(e) {
        e.preventDefault()
        
        if (this.isValidForm()) {
            const formData = new FormData()

            formData.append("name", this.state.name);
            formData.append("description", this.state.description);
            formData.append("lang", this.state.lang);
            formData.append("image_file", this.state.image_file);

            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_SERVER}/structures/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.state.token}`
                }
                })
                .then( res => {
                    const id = res.data.id
                    window.location.href = `/templates/${id}`
                })
                .catch( error => {
                    // TODO: handle error
                    // this.setState(prev => ({
                    //     ...prev,
                    //     error: error.response.data
                    // }))
                })
        }
    }

    isValidForm() {
        let error = 'Please fill all fields'
        let value = false
        if (this.state.name && this.state.image_file && this.state.lang) {
            error = ''
            value = true
        }

        this.setState(prev => ({
            ...prev,
            error
        }))

        return value
    }

    render() {
        return (
            <div className="container-fluid customBg pb-5 pt-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-6 mx-auto">
                            <h2 className="text-center font-weight-bold mt-3 mb-5">
                                Create new template
                            </h2>
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="inputTitle">Template name</label>
                                    <input type="text" name="name" onChange={this.handleInput} className="form-control" id="inputTitle"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescription">Template description</label>
                                    <textarea className="form-control" name="description" onChange={this.handleInput} id="inputDescription" rows="3"></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-8">
                                        <label htmlFor="inputFile">Document image</label>
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">Upload</span>
                                                </div>
                                                <div className="custom-file">
                                                    <input onChange={this.handleImage} name="image_file" type="file" className="custom-file-input" id="inputFile" />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputLanguage">Language</label>
                                        <select onChange={this.handleInput} name="lang" id="inputLanguage" defaultValue="eng" className="form-control">
                                            <option value="eng">eng</option>
                                            <option value="rus">rus</option>
                                            <option value="de">de</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <button type="submit" className="btn customBtn">Create</button>
                                    </div>
                                    <div className="form-group col-md-8">
                                        {this.state.error && <span className="badge badge-danger p-2">{this.state.error}</span>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateNewProject
