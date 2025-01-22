<script setup lang="ts">
import type { Entity } from "~~/types/entity"
import { vInfiniteScroll } from "@vueuse/components"

const props = defineProps<{
  data: Entity[]
}>()

const emit = defineEmits<{
  delete: [number]
  loadMore: []
}>()
const loadTrigger = useTemplateRef("loadTrigger")

useIntersectionObserver(
  loadTrigger,
  ([entries]) => {
    if (entries?.isIntersecting) {
      emit("loadMore")
      console.log("load more")
    }
  },
  {
    rootMargin: "0px 0px 10% 0px",
    immediate: true,
  },
)
</script>

<template>
  <div class="relative flex w-full flex-col gap-y-2">
    <EntityListItem
      v-for="item in data"
      :key="item.id"
      :data="item"
      @delete="emit('delete', item.id)"
    />
    <div ref="loadTrigger" class="absolute bottom-0 left-0"></div>
  </div>
</template>
