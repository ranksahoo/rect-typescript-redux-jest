import React from 'react'
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from 'react-icons/hi'

type PaginationProps = {
  gotoPage: (page: number) => void
  previousPage: () => void
  nextPage: () => void
  setPageSize: (pageSize: number) => void
  canPreviousPage: boolean
  canNextPage: boolean
  pageIndex: number
  pageSize: number
  pageCount: number
}

function Pagination({
  gotoPage,
  previousPage,
  nextPage,
  setPageSize,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageSize,
  pageCount,
}: PaginationProps) {
  return (
    <div className="mt-2 flex items-center justify-center gap-3">
      <button
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        <HiChevronDoubleLeft />
      </button>{' '}
      <button
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <HiChevronLeft />
      </button>{' '}
      <button
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <HiChevronRight />
      </button>{' '}
      <button
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <HiChevronDoubleRight />
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageCount}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          className="w-32"
          type="number"
          value={pageIndex + 1}
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
  )
}

export default Pagination
