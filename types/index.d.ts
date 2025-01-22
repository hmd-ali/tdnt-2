import type { Permission } from "~/components/global/PermissionCheck"
import type { User } from "./user"

declare module "#app" {
  interface PageMeta {
    permissions?: Permission[]
  }
}

declare module "h3" {
  interface H3EventContext {
    user: User
  }
}
export {}
