import React, { useMemo } from "react";
import { useTable } from "react-table";

import MOCK_DATA from '../../MOCK_DATA.json'
import COLUMNS from './column'
import './dashboard.css'

 const Dashboard= () =>{
    const columns=useMemo(()=> COLUMNS,[])
    const data=useMemo(()=> MOCK_DATA,[])

    const tableInstance= useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return(
        <div > <h4 className="dashboard">- Welcome to Dashboard Table -</h4>
        <table>
        
            <thead {...getTableProps()}>
                {
                    headerGroups.map(headerGroup =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) =>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                            <th></th>
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row =>{
                        prepareRow(row)
                        return(
                          <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell =>{
                                    return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>                                    
                                })
                            }
                              <td></td>
                          </tr>
                        )
                    })
                }
               
            </tbody>

        </table>
        </div>
    )
}
export default Dashboard