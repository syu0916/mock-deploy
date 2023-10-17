import { Dispatch, SetStateAction } from "react"
import Table from 'react-bootstrap/Table';

interface TableOutputProps{
    type: string
    // data to be table-ified
    body: string[][]
    error_message: string
}

interface dataResponse {
    headers: string[]
    body: string[][]
}

/**
 * This method.component converts a JSON to a table format.
 * @param responseMap: the responseMap that contains all of the data to be 
 * converted to a table format
 */
export function TableComponentSearch(responseMap : JSON | null){
    let concatenatedResponse :JSX.Element;
    let convertedResponseMap: TableOutputProps = responseMap as unknown as TableOutputProps;
    
    // errored response maps should output nothing but an informative message.
    if (responseMap == null || convertedResponseMap.type == "error") {
        concatenatedResponse = <div>No dataset has been loaded at this time.</div>
    } 

    // creating the table
    else {
        let columns : JSX.Element[] = []
        console.log(convertedResponseMap)

        let rows :JSX.Element[] = []
        for (let i = 0; i < convertedResponseMap.body.length;i ++) {
            let row : JSX.Element[] = [];
            for (let j = 0; j < convertedResponseMap.body[0].length; j ++) {
                row.push(<td>{convertedResponseMap.body[i][j]}</td>)
            }
            rows.push(<tr>{row}</tr>)
        }
        let data : JSX.Element = <tbody>{rows}</tbody>
        let table: JSX.Element = 
            <Table striped bordered hover>
                {data}
            </Table>
        return table
    }
}