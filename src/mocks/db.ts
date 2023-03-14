import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { Payload, Post, postStatuses } from '@store/index'
import { rest } from 'msw'
import MOCK_DATA from './MOCK_DATA.json'
import _ from 'lodash'

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

  rest.post('/users', async (req, res, ctx) => {
    const page = (req.url.searchParams.get('page') || 1) as number
    const perPage = (req.url.searchParams.get('perPage') || 10) as number
    const payload: Payload = await req.json()
    const sortBy: any[] = []
    const filters: any = {}
    if (payload.sortBy) {
      payload.sortBy.forEach((item) => {
        sortBy.push({ [item.id]: item.desc ? 'desc' : 'asc' })
      })
    }
    console.log(payload)
    if (payload.filters) {
      payload.filters.forEach((item) => {
        console.log('isDate::', _.isDate(item.value))
        if (_.isNumber(item.value)) {
          filters[item.id] = { equals: Number(item.value) }
        } else if (_.isDate(item.value)) {
          filters[item.id] = { equals: item.value }
        } else {
          filters[item.id] = { contains: item.value }
        }
        console.log(filters)
      })
    }
    console.log(filters)

    const requestData: any = {
      take: Number(perPage),
      skip: Math.max(Number(perPage) * (Number(page) - 1), 0),
    }
    if (!_.isEmpty(sortBy)) {
      requestData['orderBy'] = sortBy
    }
    if (!_.isEmpty(filters)) {
      requestData['where'] = filters
    }
    console.log(requestData)
    const updatedData = db.user.findMany({ where: filters })

    const data = db.user.findMany(requestData)
    return res(
      ctx.json({
        data,
        page,
        // eslint-disable-next-line camelcase
        totalPages: Math.ceil(updatedData.length / Number(perPage)),
        total: updatedData.length,
      }),
    )
  }),
  ...db.post.toHandlers('rest'),
  ...db.user.toHandlers('rest'),
] as const
