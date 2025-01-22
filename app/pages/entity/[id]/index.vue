<script setup lang="ts">
const entityStore = useEntityStore()
</script>

<template>
  <UiCard v-if="entityStore.entity">
    <UiCardHeader>
      <UiCardTitle>
        {{ entityStore.entity.firstName }} {{ entityStore.entity.lastName }}
      </UiCardTitle>
      <UiCardDescription>
        {{ entityStore.entity.address }}
      </UiCardDescription>
      <UiCardContent class="grid gap-4 px-0 md:grid-cols-2">
        <div>
          <span class="font-medium">Marital Status: </span>
          <span class="font-thin">{{ entityStore.entity.maritalStatus }}</span>
        </div>
        <div>
          <span class="font-medium">Date of Birth: </span>
          <span class="font-thin">{{ entityStore.entity.dob }}</span>
        </div>
        <div>
          <span class="font-medium">Gender: </span>
          <span class="font-thin">{{ entityStore.entity.gender }}</span>
        </div>
        <div>
          <span class="font-medium">Phone: </span>
          <span class="font-thin">{{ entityStore.entity.phone }}</span>
        </div>
      </UiCardContent>
    </UiCardHeader>
  </UiCard>
</template>
