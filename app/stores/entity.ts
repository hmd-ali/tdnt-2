import type { Entity } from "~~/types/entity"

export const useEntityStore = defineStore("entity", () => {
  const entities = ref<Entity[]>([])

  const entity = ref<Entity>()

  const fetchEntities = async () => {
    const { $api } = useNuxtApp()
    const response = await $api("/api/entity")
    entities.value = response.data
    return response.data
  }

  const fetchEntity = async (id: number) => {
    const { $api } = useNuxtApp()
    const response = await $api(`/api/entity/${id}`)
    entity.value = response.data
    return response.data
  }

  const updateEntity = async (id: number, data: Omit<Entity, "id">) => {
    const { $api } = useNuxtApp()
    const response = await $api(`/api/entity/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
    entity.value = response.data
    return response.data
  }

  return {
    entity,
    entities,
    fetchEntities,
    fetchEntity,
    updateEntity,
  }
})
