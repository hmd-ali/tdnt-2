import { z } from "zod"
import { mockEntities } from "~~/server/data"

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, (data) =>
    z
      .object({
        id: z.string().refine((v) => !isNaN(parseInt(v))),
      })
      .parse(data),
  )

  const entity = mockEntities.find((x) => x.id === parseInt(params.id))

  if (entity === undefined) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    })
  }
  return {
    statusCode: 200,
    data: entity,
  }
})
