import React, { useEffect, useMemo, useReducer } from 'react'
import { useTable, usePagination, useFilters, useSortBy } from 'react-table'
import { ColumnFilter } from '@components/table/ColumnFilter'
import Pagination from './Pagination'
import { useListUsersQuery } from '@store/index'
import Skeleton from '@components/Skeleton'
export const PAGE_CHANGED = 'PAGE_CHANGED'
export const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED'
export const PAGE_SORT_CHANGED = 'PAGE_SORT_CHANGED'
export const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED'
export const TOTAL_PAGE_COUNT_CHANGED = 'TOTAL_PAGE_COUNT_CHANGED'

interface PaginationTableProps {
  columns: any[]
  data: any[]
  pageIndex: number
  pageSize: number
  pageCount: number
  filters: []
  sortBy: []
  // dispatch: React.Dispatch<{
  //   type: any
  //   payload: any
  // }>
}
export const PaginationTable = ({
  columns,
  data,
  pageIndex: queryPageIndex,
  pageSize: queryPageSize,
  pageCount: controlledPageCount,
  filters: queryfilters,
  sortBy: querySortBy,
}: // dispatch,
PaginationTableProps) => {
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    [],
  )

  const initialState = {
    ctlpageIndex: 0,
    ctlpageSize: 10,
    ctlpageCount: 10,
    ctlfilters: [],
    ctlsortBy: [],
  }

  const reducer = (state, { type, payload }) => {
    console.log('type::', type)
    console.log('payload::', payload)
    switch (type) {
      case PAGE_CHANGED:
        return {
          ...state,
          ctlpageIndex: payload,
        }
      case PAGE_SIZE_CHANGED:
        return {
          ...state,
          ctlpageSize: payload,
        }
      case PAGE_SORT_CHANGED:
        return {
          ...state,
          ctlsortBy: payload,
        }
      case PAGE_FILTER_CHANGED:
        return {
          ...state,
          ctlfilters: payload,
        }
      case TOTAL_PAGE_COUNT_CHANGED:
        return {
          ...state,
          ctlpageCount: payload,
        }
      default:
    }
  }

  console.log('pageIndex::')

  const [{ ctlpageIndex, ctlpageSize, ctlpageCount, ctlfilters, ctlsortBy }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  console.log('pageIndex::', ctlpageIndex)

  const {
    data: users,
    isLoading,
    isFetching,
  } = useListUsersQuery({
    page: ctlpageIndex + 1,
    perPage: ctlpageSize,
    sortBy: ctlsortBy,
    filters: ctlfilters,
  })

  useEffect(() => {
    dispatch({ type: TOTAL_PAGE_COUNT_CHANGED, payload: users?.totalPages })
  }, [data, users?.totalPages])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize, filters, sortBy },
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data: users?.data || [],
      defaultColumn,
      initialState: {
        pageIndex: ctlpageIndex,
        pageSize: ctlpageSize,
        filters: ctlfilters,
        sortBy: ctlsortBy,
      },
      manualPagination: true,
      pageCount: data ? ctlpageCount : 1,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
    },
    useFilters,
    useSortBy,
    usePagination,
  )

  useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: pageIndex })
    console.log(pageIndex)
  }, [dispatch, pageIndex])

  useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize })
    gotoPage(0)
  }, [pageSize, gotoPage, dispatch])

  useEffect(() => {
    dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy })
    gotoPage(0)
  }, [sortBy, gotoPage, dispatch])

  useEffect(() => {
    dispatch({ type: PAGE_FILTER_CHANGED, payload: filters })
    gotoPage(0)
  }, [gotoPage, dispatch, filters])

  if (isLoading || isFetching) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  if (!users?.data) {
    return <div>No data available!</div>
  }

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
    </div>
  )
}
