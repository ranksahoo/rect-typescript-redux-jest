import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  age: number
  country: string
  phone: string
}

export interface Payload {
  page: number
  perPage: number
  sortBy: any[]
  filters: any[]
}

interface ListResponse<T> {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: T[]
}
export const usersApi = createApi({
  reducerPath: 'new-users',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    listUsers: build.query<ListResponse<User>, Payload | void>({
      query: ({ page = 1, perPage = 10, sortBy = [], filters = [] }: Payload) => {
        return {
          url: '/users',
          params: {
            page: page,
            perPage: perPage,
          },
          body: { sortBy, filters },
          method: 'POST',
        }
      },
    }),
  }),
})

export const { useListUsersQuery } = usersApi
