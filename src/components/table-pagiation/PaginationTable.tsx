import React, { useMemo } from 'react'
import { useTable, usePagination, useFilters } from 'react-table'
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from 'react-icons/hi'
import { COLUMNS } from './columns'
import MOCK_DATA from './MOCK_DATA.json'
import { ColumnFilter } from '@components/table/ColumnFilter'

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination,
  )

  const { pageIndex, pageSize } = state

  return (
    <div className="w-full">
      <table className="w-full border-collapse font-sans" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr className="w-full" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th
                  className="border border-[#ddd] px-2 py-3 text-center"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <tr className="odd:bg-white even:bg-[#f2f2f2] hover:bg-[#ddd]" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td className="border border-[#ddd] p-2" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <HiChevronDoubleLeft />
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <HiChevronLeft />
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <HiChevronRight />
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <HiChevronDoubleRight />
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            className="w-32"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
          />
        </span>{' '}
        <select
          className="w-32 p-2"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
