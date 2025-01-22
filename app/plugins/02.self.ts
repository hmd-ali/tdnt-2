export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const { $api } = useNuxtApp()

  await useAsyncData(async () => {
    try {
      const response = await $api("/api/auth/self")
      userStore.setUser(response.user)
      userStore.setToken(response.token)
    } catch (error: any) {
      console.error(error)
    }
    return true
  })
})
