import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postStatuses = ['draft', 'published', 'pending_review'] as const

export interface Post {
  id: string
  title: string
  author: string
  content: string
  status: (typeof postStatuses)[number]
  createdAt: string
  updatedAt: string
}

interface ListResponse<T> {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: T[]
}
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
  }),
  endpoints: (build) => ({
    listPosts: build.query<ListResponse<Post>, number | void>({
      query: (page = 1) => `posts?page=${page}`,
    }),
  }),
})

export const { useListPostsQuery } = postsApi
