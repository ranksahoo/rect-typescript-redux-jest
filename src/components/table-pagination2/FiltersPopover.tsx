import React, { Fragment, useEffect, useState } from 'react'
import { FunnelIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import _ from 'lodash'

type FiltersPopoverProps = {
  columns: any[]
  setSortBy: any
  setAllFilters: any
  sortBy: any[]
  filters: any[]
}
const schema = yup
  .object({
    sortBy: yup.string(),
    orderBy: yup.string(),
    first_name: yup.string(),
    last_name: yup.string(),
    date_of_birth: yup.date(),
    country: yup.string(),
    phone: yup.string(),
    email: yup.string(),
    age: yup.number(),
  })
  .required()
type FormData = yup.InferType<typeof schema>
export default function FiltersPopover({
  columns,
  setSortBy,
  setAllFilters,
  sortBy,
  filters,
}: FiltersPopoverProps) {
  const [selectedFilters, setSelectedFilters] = useState<any[]>([])
  const [selectedColumn, setSelectedColumn] = useState<any>(null)
  const [availableColumns, setAvailableColumns] = useState<any[]>(columns)

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  console.log(errors)

  useEffect(() => {
    const data: any = {}
    if (!_.isEmpty(sortBy)) {
      data.sortBy = sortBy[0].id
      data.orderBy = sortBy[0].desc ? 'desc' : 'asc'
    }
    if (!_.isEmpty(filters)) {
      filters.forEach((item) => {
        data[item.id] = item.value
      })
    }
    const selectedFilters = availableColumns.filter((item) => {
      for (const property in data) {
        if (property === item.accessor) return true
      }
    })
    setSelectedFilters(selectedFilters)
    reset(data)
  }, [sortBy, filters, reset])

  const onSubmit = (data: FormData) => {
    const request: any = { ...data }
    const sortBy: any = {}
    if (request.sortBy) {
      sortBy['id'] = data.sortBy
    }
    if (!_.isEmpty(sortBy)) {
      if (request.orderBy) {
        sortBy['desc'] = request.orderBy === 'desc'
      }
    }
    if (!_.isEmpty(sortBy)) {
      setSortBy([sortBy])
    } else {
      setSortBy([])
    }
    delete request.sortBy
    delete request.orderBy

    const filters: any[] = []
    for (const property in request) {
      console.log('IS date::', request[property] instanceof Date)
      if (request[property] instanceof Date)
        filters.push({ id: property, value: request[property].toISOString() })
      else filters.push({ id: property, value: request[property] })
    }
    console.log(filters)
    setAllFilters(filters)
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
    ${open ? '' : 'text-opacity-90'}
    group inline-flex items-center rounded-md border border-gray-500 px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <FunnelIcon
              className={`${open ? '' : 'text-opacity-70'}
      h-5 w-5 text-gray-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-full z-10 mt-3 max-h-fit w-80 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative flex flex-col gap-2 bg-white p-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-semibold">Sort and Filters</h1>
                    <div className="h-80 overflow-y-auto p-2">
                      <div>
                        <label htmlFor="sortBy" className="my-2 text-lg font-bold">
                          Sort by :
                        </label>
                        <div className="mb-2 flex items-center gap-3">
                          <select className="w-full p-2" {...register('sortBy')}>
                            <option value="">None</option>
                            {columns.map((column) => (
                              <option key={column.accessor} value={column.accessor}>
                                {column.Header}
                              </option>
                            ))}
                          </select>
                          <select className="w-28 p-2" {...register('orderBy')}>
                            {[
                              { name: 'Asc', value: 'asc' },
                              { name: 'Desc', value: 'desc' },
                            ].map((order, index) => (
                              <option key={`order_key_${index}`} value={order.value}>
                                {order.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <h1 className="my-2 text-lg font-bold">Filters :</h1>
                      <div className="mb-2 flex items-center gap-3">
                        <select
                          className="w-full p-2"
                          onChange={(evt) => {
                            const value = evt.currentTarget.value
                            const filterColumns = availableColumns.filter(
                              (item) => item.accessor === value,
                            )
                            if (filterColumns?.length > 0) {
                              setSelectedColumn(filterColumns[0])
                            }
                          }}
                        >
                          <option value="">None</option>
                          {availableColumns.map((column) => (
                            <option key={column.accessor} value={column.accessor}>
                              {column.Header}
                            </option>
                          ))}
                        </select>
                        <button
                          className="rounded border border-gray-400 p-2 hover:bg-gray-300"
                          disabled={!selectedColumn}
                          onClick={() => {
                            setSelectedFilters((prevValue) => {
                              return [...prevValue, { ...selectedColumn }]
                            })
                            const updateColumnList = [...availableColumns]
                            updateColumnList.splice(updateColumnList.indexOf(selectedColumn), 1)
                            setAvailableColumns(updateColumnList)
                            setSelectedColumn(null)
                          }}
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                      {selectedFilters.map((item) => (
                        <div className="flex items-center justify-between" key={item.accessor}>
                          <div className="w-full">
                            <label
                              htmlFor={item.accessor}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {item.Header}
                            </label>
                            <div className="mt-1 flex w-full items-center gap-3">
                              <input {...register(item.accessor)} type={item.type} />
                              <button
                                className="rounded border border-gray-400 p-2 hover:bg-gray-300"
                                onClick={() => {
                                  const updateFilterList = [...selectedFilters]
                                  updateFilterList.splice(updateFilterList.indexOf(item), 1)
                                  setSelectedFilters(updateFilterList)
                                  setAvailableColumns((prevValue) => {
                                    return [...prevValue, item]
                                  })
                                  unregister(item.accessor)
                                }}
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="reset"
                        className="rounded border border-gray-400 p-2 hover:bg-gray-300"
                        onClick={() => {
                          setSelectedFilters([])
                          reset({ sortBy: '', orderBy: '' })
                          setAvailableColumns(columns)
                        }}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-amber-700 p-2 text-white hover:bg-amber-800"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
