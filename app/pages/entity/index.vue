<script setup lang="ts">
import type { Entity } from "~~/types/entity"

const entitiesStore = useEntityStore()

const data = useState<Entity[]>(() => [])
watchEffect(() => {
  data.value = entitiesStore.entities
})

const { refresh } = await useAsyncData("entities", () =>
  entitiesStore.fetchEntities(),
)

const handleLoadMore = () => {
  const length = entitiesStore.entities.length + 1
  data.value.push(
    ...Array.from(
      { length: 10 },
      (_, i) =>
        ({
          id: length + i,
          firstName: "infinite scroll",
          lastName: `${i + length}`,
          maritalStatus: "Single",
          profilePicture: null,
          address: "123 Main St",
          dob: "1990-01-01",
          gender: "Female",
          phone: "01123456",
        }) satisfies Entity,
    ),
  )
}
</script>

<template>
  <div class="w-full">
    <EntityList
      v-if="entitiesStore.entities"
      :data
      @load-more="handleLoadMore"
      @delete="refresh()"
    />
  </div>
</template>
