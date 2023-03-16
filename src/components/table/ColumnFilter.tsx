import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  const [value, setValue] = useState(filterValue)
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1000)

  return (
    <div className='shadow-sm" relative mt-2 rounded-md'>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
        <span className="text-gray-500 sm:text-sm">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </div>
      <input
        className="pl-6"
        type="text"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        disabled
      />
    </div>
  )
}
