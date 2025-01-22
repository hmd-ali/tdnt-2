import type { User } from "~~/types/user"

export const useUserStore = defineStore("user", () => {
  const user = ref<User>()
  const token = ref<string>()

  const setUser = (value: User) => {
    user.value = value
  }
  const setToken = (value: string) => {
    token.value = value
    sessionStorage.setItem("token", value)
  }
  const logout = () => {
    token.value = undefined
    user.value = undefined
    sessionStorage.removeItem("token")
    return navigateTo("/")
  }

  return {
    user,
    setUser,
    setToken,
    logout,
  }
})
