import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { Post, postStatuses } from '@store/index'
import { rest } from 'msw'

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
  ...db.post.toHandlers('rest'),
] as const
