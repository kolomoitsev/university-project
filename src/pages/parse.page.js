import React, {useEffect, useState} from "react";

import axios from 'axios'

import uuid from 'react-uuid'

import {Header, Footer} from "../components/componets";

import '../App.css';

const token = localStorage.getItem('token')


const ParsePage = () => {

    const data = [
      {
        name: 'field number 1',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 2',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 3',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 4',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 5',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 6',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
      {
        name: 'field number 7',
        value: 'Lorem ipsum dolor sit, amet consectetur'
      },
    ]

    const [templates, setTemplates] = useState(null)
    const [uploadedImg, setUploadedImg] = useState(null)
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const [checkData, setCheckData] = useState(false)

    useEffect( () => {

      const getUserTemplates = async () => {

        const { data : { results } } = await axios.get(`${process.env.REACT_APP_API_SERVER}/structures/` , {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })

        //results && console.log(results)
        results && setTemplates(results)

      }

      getUserTemplates()

    }, [])

    useEffect(() => {

      if(templates !== null && selectedTemplate !== null) setCheckData(true)

    })

    const handleParse = async (event) => {

      event.preventDefault()

      const form = new FormData()

      await form.append('image', uploadedImg)

      //console.log(selectedTemplate)

      await axios.post(`http://localhost:8001/api/v0/ocr/${selectedTemplate}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(res => console.log(res))
          .catch(err => console.log(err))

    }

    // uploadedImg && console.log(uploadedImg)
    // selectedTemplate && console.log(selectedTemplate)

    //

    return (
        <div>

          <Header/>

            <div className="container mt-3 main">

                <h2 className="mb-3 font-weight-bold ">Parse document</h2>
                <div className="row parse-block">
                  <div className="col-md-3">
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input onChange={event => setUploadedImg(event.target.files[0])} type="file" className="custom-file-input" id="inputGroupFile01" />
                        <label className="custom-file-label" htmlFor={"inputGroupFile01"}>Choose file</label>
                      </div>
                    </div>

                    {
                      templates && <div className="input-group">

                        <select onChange={event => setSelectedTemplate(event.target.value)} className="custom-select" id="inputGroupSelect04">

                          <option defaultValue={"Choose template"}>Choose template</option>

                          { templates.map(temp => <option key={temp.id} value={temp.id}>{temp.name}</option> ) }

                        </select>

                        {
                          checkData && <div className="input-group-append">
                            <button onClick={ handleParse } className="btn btn-outline-secondary" type="button">Parse</button>
                          </div>
                        }

                      </div>

                    }


                  </div>
                  <div className="col-md-2 text-center">
                    <i className='bx bx-right-arrow-circle bx-flip-vertical' > </i>
                    <button className="btn customBtn mt-3">Save JSON</button>
                  </div>
                  <div className="col-md-7 text-center">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Field name</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        { data && data.map(item =>
                          <tr key={ uuid() }>
                            <td>{ item.name }</td>
                            <td>{ item.value }</td>
                          </tr>
                          )
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

            <Footer/>
          </div>
      )
};

export default ParsePage
