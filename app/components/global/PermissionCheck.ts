import type { EmitsOptions, SetupContext, SlotsType } from "vue"
import { useUserStore } from "~/stores/user"

export type Permission = "admin" | "guest"

export default (
  props: { permissions: Permission[] },
  ctx: SetupContext<
    EmitsOptions,
    SlotsType<{ default(): any; fallback(): any }>
  >,
) => {
  const userStore = useUserStore()
  if (!checkPermission(props.permissions, userStore.user?.permissions ?? []))
    return ctx.slots.fallback?.() ?? null
  return ctx.slots.default?.()
}
