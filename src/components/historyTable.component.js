import React from "react";

const HistoryTable = () => {

    const data = [
        {
            templateName : `temp1`,
            documentName : `name1`,
            documentDate : `11.10.2020`,
            documentLanguage : `en`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp2`,
            documentName : `name2`,
            documentLanguage : `es`,
            documentDate : `12.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp3`,
            documentName : `name3`,
            documentLanguage : `ru`,
            documentDate : `13.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp4`,
            documentName : `name4`,
            documentLanguage : `uk`,
            documentDate : `14.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp5`,
            documentName : `name5`,
            documentLanguage : `kz`,
            documentDate : `15.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp6`,
            documentName : `name6`,
            documentLanguage : `md`,
            documentDate : `16.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        },
        {
            templateName : `temp7`,
            documentName : `name7`,
            documentLanguage : `fr`,
            documentDate : `17.10.2020`,
            documentLink : `https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/now`
        }
    ]


    return  (
        <>

            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col"><a href="">Template name</a></th>
                    <th scope="col">Document name</th>
                    <th scope="col">Document language</th>
                    <th scope="col"><a href="">Document date</a></th>
                    <th scope="col">Download json</th>
                </tr>
                </thead>
                <tbody>



                { data && data.map(item =>
                    <tr >
                        <td>{item.templateName}</td>
                        <td>{item.documentName}</td>
                        <td>{item.documentLanguage}</td>
                        <td>{item.documentDate}</td>
                        <td><a className="btn customBtn" href={item.documentLink}>Download</a></td>
                    </tr>
                    )
                }


                </tbody>
            </table>

        </>
    )

}

export default HistoryTable
