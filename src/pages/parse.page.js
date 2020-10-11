import React from "react";

import {Header, Footer} from "../components/componets";

import '../App.css';

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

    return (<div>
            <Header/>

            <div className="container mt-3 main">

                <h2 className="mb-3 font-weight-bold ">Parse document</h2>
                <div className="row parse-block">
                  <div className="col-md-3">
                    <div class="input-group mb-3">
                      <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01" />
                        <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                      </div>
                    </div>
                    <div class="input-group">
                      <select class="custom-select" id="inputGroupSelect04">
                        <option selected>Choose template</option>
                        <option value="1">Template 1</option>
                        <option value="2">Template 2</option>
                        <option value="3">Template 3</option>
                      </select>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">Parse</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <i class='bx bx-right-arrow-circle bx-flip-vertical' ></i>
                    <button className="btn customBtn mt-3">Save JSON</button>
                  </div>
                  <div className="col-md-7 text-center">
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Field name</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        { data && data.map(item => 
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.value}</td>
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
