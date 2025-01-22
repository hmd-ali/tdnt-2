import type { UseFetchOptions } from "#app"

export const useApi = <T>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions<T> = {},
) => {
  const { $api } = useNuxtApp()
  return useFetch(url, {
    ...options,
    $fetch: $api,
  })
}
