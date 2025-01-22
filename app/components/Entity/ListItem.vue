<script setup lang="ts">
import { EyeIcon, Trash2Icon } from "lucide-vue-next"
import { toast } from "vue-sonner"
import type { Entity } from "~~/types/entity"

const { $api } = useNuxtApp()

const props = defineProps<{
  data: Entity
}>()

const emit = defineEmits<{
  delete: [number]
}>()

const { withConfirm } = useAlert()
const handleRemove = async (id: number) => {
  const confirm = await withConfirm({
    title: "Delete Entity",
    message: "Are you sure you want to delete this entity?",
    confirmText: "Delete",
    cancelText: "Cancel",
  })
  if (confirm) {
    try {
      await $api(`/api/entity/${id}`, {
        method: "DELETE",
      })
      toast.success("Entity deleted successfully", {
        description: `Entity ${props.data.firstName} ${props.data.lastName} has been deleted.`,
      })
      emit("delete", id)
    } catch (error: any) {
      toast.error(error.statusMessage)
    }
  }
}
</script>

<template>
  <UiCard class="w-full p-4">
    <div class="flex justify-between gap-x-4">
      <div class="flex">
        <div>
          <img
            :src="data.profilePicture ?? undefined"
            alt="avatar"
            class="size-12 rounded-full"
          />
        </div>
        <div>
          <p class="font-medium">{{ `${data.firstName} ${data.lastName}` }}</p>
          <p class="text-sm">{{ data.maritalStatus }}</p>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <UiButton variant="outline" size="icon" as-child>
          <NuxtLink :to="`/entity/${data.id}`">
            <EyeIcon />
          </NuxtLink>
        </UiButton>
        <PermissionCheck :permissions="['admin']">
          <UiButton
            variant="destructive"
            size="icon"
            @click="handleRemove(data.id)"
          >
            <Trash2Icon />
          </UiButton>
        </PermissionCheck>
      </div>
    </div>
  </UiCard>
</template>
