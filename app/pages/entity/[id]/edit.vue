<script setup lang="ts">
import { toast } from "vue-sonner"
import type { FormInput } from "~/components/Entity/Form.vue"

definePageMeta({
  permissions: ["admin"],
})

const entityStore = useEntityStore()

const handleSubmit = async (values: FormInput) => {
  if (!entityStore.entity) return
  try {
    await entityStore.updateEntity(entityStore.entity.id, values)
    toast.success("Entity updated successfully", {
      description: `Entity ${values.firstName} ${values.lastName} has been updated.`,
    })
    await navigateTo(`/entity/${entityStore.entity.id}`)
  } catch (error: any) {
    toast.error(error.statusMessage)
  }
}
</script>

<template>
  <UiCard v-if="entityStore.entity">
    <UiCardHeader>
      <UiCardTitle>
        Entity
        {{ `${entityStore.entity.firstName} ${entityStore.entity.lastName}` }}
      </UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <EntityForm :data="entityStore.entity" @submit="handleSubmit" />
    </UiCardContent>
  </UiCard>
</template>
