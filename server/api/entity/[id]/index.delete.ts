import { z } from "zod"
import { mockEntities } from "~~/server/data"

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string().refine((value) => !isNaN(parseInt(value))) })
      .parse,
  )

  const entity = mockEntities.find((x) => x.id === parseInt(id))

  if (entity === undefined) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }

  mockEntities.splice(mockEntities.indexOf(entity), 1)
  return {
    statusCode: 200,
    data: mockEntities,
  }
})
