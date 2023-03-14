import React, { Fragment } from 'react'
import { TableCellsIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { Checkbox } from '@chakra-ui/react'
type ColumnSelectionPopoverProps = {
  allColumns: any[]
  getToggleHideAllColumnsProps: any
}

export default function ColumnSelectionPopover({
  allColumns,
  getToggleHideAllColumnsProps,
}: ColumnSelectionPopoverProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
    ${open ? '' : 'text-opacity-90'}
    group inline-flex items-center rounded-md border border-gray-500 px-3 py-2 text-base font-medium hover:bg-gray-300 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <TableCellsIcon
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
                  <h1 className="font-semibold">Column Selection</h1>
                  <div className="h-80 overflow-y-auto p-2">
                    <div className="m-2 flex items-center gap-2 border-b border-b-gray-300 p-2">
                      <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                    </div>
                    {allColumns.map((column) => (
                      <div
                        className="m-2 flex items-center gap-2 border-b border-b-gray-300 p-2"
                        key={column.id}
                      >
                        <label>
                          <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                          {column.Header}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
