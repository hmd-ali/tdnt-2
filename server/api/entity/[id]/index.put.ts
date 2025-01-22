import { z } from "zod"
import { mockEntities } from "~~/server/data"
import { errorResponse } from "~~/server/utils/errorResponse"
import type { UnionToIntersection } from "~~/types/zod"
import { entitySchema } from "~~/validations/entity"

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string().refine((value) => !isNaN(parseInt(value))) })
      .parse,
  )
  const body = await readValidatedBody(event, (data) => {
    const combinedEntitySchema = entitySchema.reduce(
      (acc, schema) => acc.merge(schema),
      z.object({}),
    ) as z.ZodObject<
      UnionToIntersection<(typeof entitySchema)[number]["shape"]>
    >
    return combinedEntitySchema.parse(data)
  })
  console.log({ body })
  const entity = mockEntities.find((x) => x.id === parseInt(id))
  if (entity === undefined) {
    throw errorResponse("Entity not found")
  }
  Object.assign(entity, body)
  return {
    status: 200,
    data: entity,
  }
})
