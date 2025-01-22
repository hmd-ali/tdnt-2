import type { Permission } from "~/components/global/PermissionCheck"

export type User = {
  id: string
  name: string
  email: string
  token: string
  permissions: Permission[]
}
