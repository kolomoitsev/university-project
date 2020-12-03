import React, {useEffect, useState} from "react";

import axios from 'axios'

import uuid from 'react-uuid'

import {Header, Footer} from "../components/componets";

import { CSVLink, CSVDownload } from "react-csv";

import '../App.css';

import * as $ from 'jquery'

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
    const [parsedData, setParsedData] = useState(null)
    const [csvData, setCsvData] = useState(null)

    const [errorRes, setErrorRes] = useState(null)

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

    useEffect( () => {
        const getCsvData = async () => {

            let data = []

            if(await csvData && parsedData.length) data.push([`name`, `json_name`, `text`, `answer`])

            if(parsedData && parsedData.length) {
                var jsonF = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parsedData));

                $('<a href="data:' + jsonF + '" download="data.json">download JSON</a>').appendTo('#jsonHolder');
            }

            parsedData && parsedData.map(pItem => {
                data.push([pItem.name, pItem.json_name, pItem.text, pItem.ans],)
            })

            await setCsvData(data)



        }
        getCsvData()
    }, [parsedData])

    const handleParse = async (event) => {

      event.preventDefault()

      const form = new FormData()

      uploadedImg &&  form.append('image', uploadedImg)

      await axios.post(`http://localhost:8001/api/v0/ocr/${selectedTemplate}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(res => {
              setParsedData(res.data)
          })
          .catch(err => setErrorRes(err.response.data.detail))

    }


    return (
        <div>

            {
                errorRes && <div className="errorForm">
                    <div className="formInside">
                        <i onClick={ () => setErrorRes(null)} className='bx bx-x'> </i>
                        <h3>Error</h3>
                        <p>{errorRes}</p>
                    </div>
                </div>
            }

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

                      { parsedData && console.log(parsedData) }

                      { parsedData && <CSVLink className="btn customBtn" data={csvData}>Download CSV File</CSVLink> }

                      {/*{ parsedData && <a className="btn confirmBtn" href={`data: ${JSON.stringify(parsedData)}` } download={"data.json"}>Download JSON</a> }{}*/}

                      { parsedData && <div className="btn confirmBtn" id="jsonHolder"></div> }

                  </div>
                  {
                    parsedData && <div className="col-md-7 text-center">
                      <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                          <th scope="col">Field name</th>
                          <th scope="col">Json name</th>
                          <th scope="col">Value</th>
                          <th scope="col">Answer</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                parsedData && parsedData.map(item =>
                                <tr key={uuid()}>
                                  <td>{item.name}</td>
                                  <td>{item.json_name}</td>
                                  <td>{item.text}</td>
                                  <td>{item.ans}</td>
                                </tr>
                            )
                            }
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
            </div>

            <Footer/>
          </div>
      )
};

export default ParsePage
