import React, {useEffect, useState} from "react";
import axios from 'axios'

import ReactJson from 'react-json-view'
import * as $ from "jquery";
import * as _ from "lodash"

const HistoryTable = () => {

    const [history, setHistory] = useState([])

    const [selectedItem, setSelectedItem] = useState('')

    const [orderId, setOrderId] = useState('asc')

    const [searchItem, setSearchItem] = useState(null)

    const [foundedData, setFoundedData] = useState(null)

    function search(arr, s){
        let matches = [], i, key;

        for( i = arr.length; i--; )
            for( key in arr[i] )
                if( arr[i].hasOwnProperty(key) && arr[i][key].indexOf(s) > -1 )
                    matches.push( arr[i] );  // <-- This can be changed to anything

        return matches;
    };

    useEffect( () => {

        const getHistory = async () => {

            const { data : { results } } = await axios.get(`${process.env.REACT_APP_API_SERVER}/history`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
                .catch(e => console.log(e))

            //results && console.log(results)

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

    const filterIt = (arr, searchKey) =>  {
        
    }

    const handleSearchClick = () => {
        history && console.log(history)
        history && console.log(filterIt(history, searchItem))
    }

    const handleFormClick = (i) => {
        setSelectedItem(i)
    }

    const sortBy = async (field) => {

        const order = orderId === 'asc' ? 'asc' : 'desc'

        const temp = await _.orderBy(history, field, [order])

        setHistory(temp)

        if(order === 'asc') {
            setOrderId('desc')
        }
        else {
            setOrderId('asc')
        }


        //history && console.log(history)
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
                    <th scope="col"><a onClick={() => sortBy('id')}>Index</a></th>
                    <th scope="col"><a onClick={() => sortBy('template_name')} >Template name</a></th>
                    <th scope="col">Document language</th>
                    <th scope="col"><a onClick={() => sortBy('created')}>Document date</a></th>
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

            <input onChange={event => setSearchItem(event.target.value)} type="text" placeholder={"Input parsed data value to search"}/>
            <button onClick={() => handleSearchClick()} >Find</button>

            { foundedData && <table className="table table-striped table-bordered">
                <thead>
                <tr className="center-col">
                    <th scope="col"><a onClick={() => sortBy('id')}>Index</a></th>
                    <th scope="col"><a onClick={() => sortBy('template_name')} >Template name</a></th>
                    <th scope="col">Document language</th>
                    <th scope="col"><a onClick={() => sortBy('created')}>Document date</a></th>
                    <th scope="col">More data</th>
                </tr>
                </thead>
                <tbody>


                { foundedData && foundedData.map((item, index) =>
                    <tr className="centeredItem">
                        <td>{ index + 1 }</td>
                        <td>{ item.template_name }</td>
                        <td>en</td>
                        <td>{ new Date(item.updated).toLocaleString() }</td>
                        <td><a onClick={event => handleFormClick(index+1)} className="btn customBtn">Show</a></td>
                    </tr>
                )
                }


                </tbody>
            </table> }

        </>
    )

}

export default HistoryTable
