import React, { useEffect, useMemo, useReducer } from 'react'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useRowSelect,
  useResizeColumns,
} from 'react-table'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'

import { COLUMNS } from './columns'
import Pagination from './Pagination'
import { ColumnFilter } from '@components/table/ColumnFilter'
import { Checkbox } from '@components/table/Checkbox'
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa'

import FiltersPopover from './FiltersPopover'
import ColumnSelectionPopover from './ColumnSelectionPopover'

const queryClient = new QueryClient()

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: 0,
  queryPageFilter: '',
  queryPageSortBy: [],
}

const PAGE_CHANGED = 'PAGE_CHANGED'
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED'
const PAGE_SORT_CHANGED = 'PAGE_SORT_CHANGED'
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED'
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      }
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      }
    case PAGE_SORT_CHANGED:
      return {
        ...state,
        queryPageSortBy: payload,
      }
    case PAGE_FILTER_CHANGED:
      return {
        ...state,
        queryPageFilter: payload,
      }
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const fetchUsersData = async (page, pageSize, pageFilter, pageSortBy) => {
  try {
    const response = await axios.post(`/users?page=${page + 1}&perPage=${pageSize}`, {
      sortBy: pageSortBy,
      filters: pageFilter,
    })
    const results = response.data.data
    const data = {
      results: results,
      count: response.data.total,
    }
    return data
  } catch (e) {
    throw new Error(`API error:${e?.message}`)
  }
}

const DataTable = () => {
  const columns = useMemo(() => COLUMNS, [])

  const [
    { queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy },
    dispatch,
  ] = useReducer(reducer, initialState)

  const { isLoading, error, data, isSuccess } = useQuery(
    ['users', queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy],
    () => fetchUsersData(queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy),
    {
      keepPreviousData: false,
      staleTime: Infinity,
    },
  )

  console.log(isSuccess)

  const totalPageCount = Math.ceil(totalCount / queryPageSize)

  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 100,
      Filter: ColumnFilter,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    setSortBy,
    setAllFilters,
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable(
    {
      columns,
      data: data?.results || [],
      defaultColumn,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        sortBy: queryPageSortBy,
      },
      manualPagination: true,
      manualSortBy: true,
      manualFilters: true,
      pageCount: data ? totalPageCount : 10,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
      autoResetSelectedRows: false,
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
          disableFilters: true,
          disableSortBy: true,
        },
        ...columns,
      ])
    },
  )
  // const manualPageSize = []

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: pageIndex })
  }, [pageIndex])

  useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize })
    gotoPage(0)
  }, [pageSize, gotoPage])

  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy })
    gotoPage(0)
  }, [sortBy, gotoPage])

  useEffect(() => {
    dispatch({ type: PAGE_FILTER_CHANGED, payload: filters })
    gotoPage(0)
  }, [filters, gotoPage])

  useEffect(() => {
    if (data?.count) {
      dispatch({
        type: TOTAL_COUNT_CHANGED,
        payload: data.count,
      })
    }
  }, [data?.count])

  if (error) {
    return <p>Error</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div>
        <>
          <div className="mx-8 flex items-center justify-end">
            <div className="m-2 flex items-center gap-2">
              <ColumnSelectionPopover
                allColumns={allColumns}
                getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
              />
              <FiltersPopover
                columns={columns}
                setSortBy={setSortBy}
                setAllFilters={setAllFilters}
                sortBy={sortBy}
                filters={filters}
              />
            </div>
          </div>
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
                      {/* {column.render('Header')} */}
                      <div
                        className="flex h-full w-full items-center justify-between"
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}
                        <span>
                          {column.canSort ? (
                            column.isSorted ? (
                              column.isSortedDesc ? (
                                <FaSortDown />
                              ) : (
                                <FaSortUp />
                              )
                            ) : (
                              <FaSort />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                      {/* {column.canResize && (
                          <div
                            {...column.getResizerProps()}
                            className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                          />
                        )} */}
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
                  <tr
                    className="odd:bg-white even:bg-[#f2f2f2] hover:bg-[#ddd]"
                    {...row.getRowProps()}
                  >
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
        </>
      </div>
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </>
  )
}

const TableWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataTable />
    </QueryClientProvider>
  )
}

export default TableWrapper
