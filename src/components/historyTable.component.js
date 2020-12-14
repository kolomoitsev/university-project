import React, {useEffect, useState} from "react";
import axios from 'axios'

import ReactJson from 'react-json-view'
import * as $ from "jquery";


const HistoryTable = () => {

    const [history, setHistory] = useState([])

    const [selectedItem, setSelectedItem] = useState('')

    useEffect( () => {

        const getHistory = async () => {

            const { data : { results } } = await axios.get(`${process.env.REACT_APP_API_SERVER}/history`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
                .catch(e => console.log(e))

            results && console.log(results)

            results && setHistory(results)

            results && results.map((it, ind) => {
                $(`#place-${ind}`).empty();
            })

            if (results) {
                results.map((item, index) => {
                    var jsonF = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(item.parsed_data));
                    $('<a class="btn customBtn" href="data:' + jsonF + '" download="data.json">download JSON</a>').appendTo(`#place-${index}`);

                })
            }

        }

        getHistory()

    }, [selectedItem])

    const handleFormClick = (i) => {
        setSelectedItem(i)
    }

    return  (
        <>

            { selectedItem && <div className="showMoreDataJson">
                <div className="insideDisplay">
                    <i onClick={ () => setSelectedItem(null)} className='bx bxs-x-circle'> </i>
                    <ReactJson src={ (history[selectedItem-1]).parsed_data } />
                </div>
            </div> }

            <table className="table table-striped table-bordered">
                <thead>
                <tr className="center-col">
                    <th scope="col"><a href="">Index</a></th>
                    <th scope="col">Template name</th>
                    <th scope="col">Document language</th>
                    <th scope="col"><a href="">Document date</a></th>
                    <th scope="col">More data</th>
                    <th scope="col">Download json</th>
                </tr>
                </thead>
                <tbody>


                { history && history.map((item, index) =>
                    <tr className="centeredItem">
                        <td>{ index + 1 }</td>
                        <td>{ item.template_name }</td>
                        <td>en</td>
                        <td>{ new Date(item.updated).toLocaleString() }</td>
                        <td><a onClick={event => handleFormClick(index+1)} className="btn customBtn">Show</a></td>
                        <td id={`place-${index}`}> </td>
                    </tr>
                    )
                 }


                </tbody>
            </table>

        </>
    )

}

export default HistoryTable
