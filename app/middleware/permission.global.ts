import { toast } from "vue-sonner"

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (to.meta.permissions !== undefined && to.meta.permissions.length > 0) {
    if (
      !checkPermission(to.meta.permissions, userStore.user?.permissions ?? [])
    ) {
      toast.error("You don't have permission to access this page")
      return navigateTo("/")
    }
  }
})
