<script setup lang="ts">
const route = useRoute()
const id = computed(() =>
  route.params.id !== undefined
    ? parseInt(route.params.id.toString())
    : undefined,
)
const entityStore = useEntityStore()

await useAsyncData(() => entityStore.fetchEntity(id.value!))

if (!entityStore.entity) {
  showError({
    message: "Entity not found",
    statusCode: 404,
  })
}
</script>

<template>
  <div>
    <NuxtLink to="/entity">Go back to list</NuxtLink>
    <div class="my-4 flex items-center gap-x-4">
      <NuxtLink
        v-slot="{ isExactActive }: { isExactActive: boolean }"
        :to="`/entity/${route.params.id}`"
      >
        <UiButton :variant="isExactActive ? 'default' : 'secondary'" as="span">
          Details
        </UiButton>
      </NuxtLink>
      <PermissionCheck :permissions="['admin']">
        <NuxtLink
          v-slot="{ isExactActive }: { isExactActive: boolean }"
          :to="`/entity/${route.params.id}/edit`"
        >
          <UiButton
            :variant="isExactActive ? 'default' : 'secondary'"
            as="span"
          >
            Edit
          </UiButton>
        </NuxtLink>
      </PermissionCheck>
    </div>
    <NuxtPage @update="entityStore.updateEntity" />
  </div>
</template>
