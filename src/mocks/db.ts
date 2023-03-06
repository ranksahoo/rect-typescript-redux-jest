import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { Post, postStatuses } from '@store/index'
import { rest } from 'msw'
import MOCK_DATA from './MOCK_DATA.json'

const db = factory({
  post: {
    id: primaryKey(String),
    name: String,
    title: String,
    author: String,
    content: String,
    status: String,
    createdAt: String,
    updatedAt: String,
  },
  user: {
    id: primaryKey(Number),
    // eslint-disable-next-line camelcase
    first_name: String,
    // eslint-disable-next-line camelcase
    last_name: String,
    email: String,
    // eslint-disable-next-line camelcase
    date_of_birth: String,
    age: Number,
    country: String,
    phone: String,
  },
})

const getRandomStatus = () => postStatuses[Math.floor(Math.random() * postStatuses.length)]

const createPostData = (): Post => {
  const date = faker.date.past().toISOString()
  return {
    id: nanoid(),
    title: faker.lorem.words(),
    author: faker.name.fullName(),
    content: faker.lorem.paragraphs(),
    status: getRandomStatus(),
    createdAt: date,
    updatedAt: date,
  }
}

;[...new Array(50)].forEach((_) => db.post.create(createPostData()))

MOCK_DATA.forEach((user) => db.user.create(user))

export const handlers = [
  rest.get('/posts', (req, res, ctx) => {
    const page = (req.url.searchParams.get('page') || 1) as number
    const perPage = (req.url.searchParams.get('perPage') || 10) as number
    const data = db.post.findMany({
      take: perPage,
      skip: Math.max(perPage * (page - 1), 0),
    })

    return res(
      ctx.json({
        data,
        page,
        totalPages: Math.ceil(db.post.count() / perPage),
        total: db.post.count(),
      }),
    )
  }),

  rest.post('/users', (req, res, ctx) => {
    const page = (req.url.searchParams.get('page') || 1) as number
    const perPage = (req.url.searchParams.get('perPage') || 10) as number
    const data = db.user.findMany({
      take: perPage,
      skip: Math.max(perPage * (page - 1), 0),
    })
    return res(
      ctx.json({
        data,
        page,
        // eslint-disable-next-line camelcase
        total_pages: Math.ceil(db.user.count() / perPage),
        total: db.user.count(),
      }),
    )
  }),
  ...db.post.toHandlers('rest'),
  ...db.user.toHandlers('rest'),
] as const
