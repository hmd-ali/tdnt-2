export const errorResponse = (message: string, code = 404) => {
  return createError({
    statusCode: code,
    statusMessage: message,
  })
}
