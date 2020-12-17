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

    const [templates, setTemplates] = useState(null)

    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([])

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

    const getJsonFile = (data) => {
        const jsonF = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.parsed_data));
        return <a class="btn customBtn" href={`data:' + ${jsonF} + '`} download="data.json">download JSON</a>;
    }

    useEffect( () => {

        const getTemplates = async () => {

            const { data : { results } } = await axios.get(`${process.env.REACT_APP_API_SERVER}/structures/`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            })
                .catch(err => console.log(err))

            //results && console.log(results)

            results && setTemplates(results)

        }

        getTemplates()

    }, [])

    const filterIt = (arr, searchKey) =>  {

        if(!searchKey) return arr

        return arr.filter(item => {
            const finalResult = item.parsed_data.find(singleItem => {
                const keys = Object.keys(singleItem)
                const values = Object.values(singleItem)
                const resultArray = [...keys, ...values]
                const result = resultArray.find(t => t.toString().includes(searchKey))
                return !!result
            })

            return !!finalResult
        })

    }

    const handleSearchClick = () => {
        //history && console.log(history)
        history && setFoundedData(filterIt(history, searchItem))
    }

    const handleFormClick = (i) => {
        setSelectedItem(i)
    }

    useEffect(() => {

        if(!selectedCheckBoxes.length){
            return setFoundedData(null)
        }

        const result = history.filter(x => selectedCheckBoxes.some(t => t === x.template))

        setFoundedData(result)

    }, [selectedCheckBoxes])

    const handleCheckboxChange = async (event) => {

        let newArray = [...selectedCheckBoxes, event.target.value];

        if (selectedCheckBoxes.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }

        setSelectedCheckBoxes(newArray)

    };

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
    }

    history && console.log(history)

    const buildLink = (item) => {
        return <a href={`/templates/${item.template}`}>{item.template_name}</a>
    }

    return  (
        <>

            { selectedItem && <div className="showMoreDataJson">
                <div className="insideDisplay">
                    <i onClick={ () => setSelectedItem(null)} className='bx bxs-x-circle'> </i>
                    <ReactJson src={ (history[selectedItem-1]).parsed_data } />
                </div>
            </div> }

            { <table className="table table-striped table-bordered">
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

                { foundedData && foundedData.map((item, index) =>
                    <tr className="centeredItem">
                        <td>{ index + 1 }</td>
                        <td>{ buildLink(item) } </td>
                        <td>en</td>
                        <td>{ new Date(item.updated).toLocaleString() }</td>
                        <td><a onClick={event => handleFormClick(index+1)} className="btn customBtn">Show</a></td>
                        <td id={`place-${index}`}>{getJsonFile(item)}</td>
                    </tr>
                )
                }

                { (!foundedData && history) && history.map((item, index) =>
                    <tr className="centeredItem">
                        <td>{ index + 1 }</td>
                        <td className="templateLink">{ buildLink(item) }</td>
                        <td>en</td>
                        <td>{ new Date(item.updated).toLocaleString() }</td>
                        <td><a onClick={event => handleFormClick(index+1)} className="btn customBtn">Show</a></td>
                        <td id={`place-${index}`}>{getJsonFile(item)}</td>
                    </tr>
                    )
                 }


                </tbody>
            </table> }

            <div className="groupSearch">
                <input className="searchInput" onChange={event => setSearchItem(event.target.value)} type="text" placeholder={"Input parsed data value to search"}/>
                <button className="btn" onClick={() => handleSearchClick()} >Find</button>

            </div>

            <div className="checkFilter">
                <h5>Filter by template name</h5>
                { templates && templates.map((item, index) =>
                    <div className="checkItem">
                        <input onChange={event => handleCheckboxChange(event)} type="checkbox" id={`template${index}`} name={`template${index}`} value={item.id} />
                        <label htmlFor={`template${index}`}>{item.name}</label>
                    </div>
                ) }
            </div>






        </>
    )

}

export default HistoryTable
