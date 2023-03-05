// import { BasicTable } from '@components/basic-table/BasicTable'
import { FilteringTable } from '@components/filtering-table/FilteringTable'
const Table = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold">Users</h1>
      {/* <BasicTable /> */}
      <FilteringTable />
    </div>
  )
}
export default Table
