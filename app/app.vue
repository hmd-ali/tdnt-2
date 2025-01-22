<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <NuxtLayout>
    <div class="grow">
      <div class="flex items-center justify-between pb-4">
        <div>
          <p>
            <span class="font-medium">Logged in as: </span
            >{{ userStore.user?.name }}
          </p>
        </div>
        <UiButton v-if="userStore.user !== undefined" @click="userStore.logout">
          Logout
        </UiButton>
      </div>
      <NuxtPage />
    </div>
  </NuxtLayout>
  <UiToaster rich-colors />
  <VAlert />
</template>
