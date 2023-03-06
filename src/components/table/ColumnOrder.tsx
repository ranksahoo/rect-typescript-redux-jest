import React, { useMemo } from 'react'
import { useTable, useColumnOrder } from 'react-table'
import { COLUMNS } from './columns'
import MOCK_DATA from './MOCK_DATA.json'
import './table.css'

export const ColumnOrder = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
    },
    useColumnOrder,
  )

  const changeOrder = () => {
    setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
  }

  return (
    <>
      <button className="m-2 border bg-gray-400 p-2 hover:bg-gray-500" onClick={changeOrder}>
        Change column order
      </button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  )
}
