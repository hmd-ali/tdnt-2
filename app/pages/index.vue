<script setup lang="ts">
import { toast } from "vue-sonner"
import { z } from "zod"

definePageMeta({
  middleware: () => {
    const userStore = useUserStore()
    if (userStore.user !== undefined) {
      return navigateTo("/entity")
    }
  },
})

const { $api } = useNuxtApp()
const userStore = useUserStore()

const zodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

const validationSchema = toTypedSchema(zodSchema)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    password: "",
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await $api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
    userStore.setUser(response.user)
    userStore.setToken(response.token)
    await navigateTo("/entity")
  } catch (error: any) {
    toast.error(error.statusMessage)
  }
})
</script>

<template>
  <UiCard class="m-auto w-full lg:max-w-2xl">
    <UiCardHeader>
      <UiCardTitle>Login</UiCardTitle>
      <UiCardDescription>
        Please enter your email and password to login.
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <form
        id="login-form"
        class="grid gap-6 lg:grid-cols-2"
        @submit.prevent="onSubmit"
      >
        <UiFormField v-slot="{ componentField }" name="email">
          <UiFormItem>
            <UiFormLabel>Email</UiFormLabel>
            <UiFormControl>
              <UiInput v-bind="componentField" placeholder="Email" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" name="password">
          <UiFormItem>
            <UiFormLabel>Password</UiFormLabel>
            <UiFormControl>
              <UiInput
                v-bind="componentField"
                placeholder="Password"
                type="password"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </form>
    </UiCardContent>
    <UiCardFooter>
      <UiButton :disabled="isSubmitting" type="submit" form="login-form">
        Login
      </UiButton>
    </UiCardFooter>
    <div
      v-if="isSubmitting"
      class="absolute inset-0 flex items-center justify-center bg-white/40"
    >
      <div
        class="size-4 animate-spin rounded-full border border-black border-b-transparent"
      ></div>
    </div>
  </UiCard>
</template>
