import type { Permission } from "~/components/global/PermissionCheck"

export const checkPermission = (
  permissions: Permission[],
  userPermissions: Permission[],
) => permissions.every((permission) => userPermissions.includes(permission))
