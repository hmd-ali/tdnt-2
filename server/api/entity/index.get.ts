import { mockEntities } from "~~/server/data"

export default defineEventHandler(async () => {
  return {
    statusCode: 200,
    data: mockEntities,
  }
})
