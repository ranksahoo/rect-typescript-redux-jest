import Skeleton from '@components/Skeleton'
import { User, Payload, useListUsersQuery } from '@store/index'
import React, { useState } from 'react'
import { PaginationTable } from './PaginationTable'

const UsersManager = () => {
  const [page, setPage] = useState(1)
  const {
    data: users,
    isLoading,
    isFetching,
  } = useListUsersQuery({ page, perPage: 10, sortBy: [], filters: [] })

  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  if (!users?.data) {
    return <div>No data available!</div>
  }

  return <PaginationTable />
}
export default UsersManager
