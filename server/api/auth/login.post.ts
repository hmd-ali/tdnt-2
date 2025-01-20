import { z } from "zod"
import { users } from "~~/server/data"

export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const loginSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Email is required"),
    password: z.string({
      required_error: "Password is required",
    }),
  })
  const body = await readValidatedBody(event, loginSchema.parse)

  const user = users.find((u) => u.email === body.email)
  if (user === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid username or password",
    })
  }

  const isPasswordCorrect = await verifyPassword(body.password, user.password)
  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid username or password",
    })
  }
  return {
    user,
    token: user.token,
  }
})
