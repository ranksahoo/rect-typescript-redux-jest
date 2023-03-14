// import { BasicTable } from '@components/basic-table/BasicTable'
// import { SortingTable } from '@components/sorting-table/SortingTable'
// import { ColumnOrder } from '@components/sorting-table/ColumnOrder'
// import { ColumnHiding } from '@components/sorting-table/ColumnHiding'
// import { RowSelection } from '@components/sorting-table/RowSelection'

import Skeleton from '@components/Skeleton'
import UsersManager from '@components/table-pagination/UsersManager'

// import { PaginationTable } from '@components/table-pagiation/PaginationTable'

// import { PaginationTable } from '@components/table/PaginationTable'

// import { FilteringTable } from '@components/filtering-table/FilteringTable'
const Table = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold">Users</h1>
      {/* <BasicTable /> */}
      {/* <FilteringTable /> */}
      {/* <SortingTable /> */}
      {/* <ColumnOrder /> */}
      {/* <ColumnHiding /> */}
      {/* <RowSelection /> */}
      {/* <PaginationTable /> */}
      <UsersManager />
      {/* <Skeleton times={0} className={''} /> */}
    </div>
  )
}
export default Table
