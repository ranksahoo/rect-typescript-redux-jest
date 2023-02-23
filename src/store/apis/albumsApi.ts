import { faker } from '@faker-js/faker'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../slices/usersSlice'

const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export interface Album {
  userId: number
  title: string
  id: number
}
const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      await pause(1000)
      return fetch(...args)
    },
  }),
  tagTypes: ['Album', 'UserAlbums'],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        // providesTags: (result, error, user) => {
        //   return [{ type: "Album", id: user.id }];
        // },
        providesTags: (result, error, user) => {
          const tags = result.map((album: Album) => {
            return { type: 'Album', id: album.id }
          })
          tags.push({ type: 'UserAlbums', id: user.id })
          return tags
        },
        query: (user: User) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            //headers: {},
            method: 'GET',
          }
        },
      }),
      addAlbum: builder.mutation({
        // invalidatesTags: (result, error, user) => {
        //   return [{ type: "Album", id: user.id }];
        // },
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UserAlbums', id: user.id }]
        },
        query: (user: User) => {
          return {
            url: '/albums',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
            //headers: {},
            method: 'POST',
          }
        },
      }),
      removeAlbum: builder.mutation({
        // invalidatesTags: (result, error, album) => {
        //   return [{ type: "Album", id: album.userId }];
        // },
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }]
        },
        query: (album: Album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        },
      }),
    }
  },
})

console.log(albumsApi)

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi
export { albumsApi }
