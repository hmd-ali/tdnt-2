<script setup lang="ts">
const { current } = useAlert()

const handleConfirm = () => {
  current.value?.resolve(true)
  current.value = undefined
}

const handleCancel = () => {
  current.value?.resolve(false)
  current.value = undefined
}

const button = useTemplateRef("confirmButtonRef")
watchEffect(() => {
  if (current.value !== undefined) {
    button.value?.$el.focus()
  }
})
</script>

<template>
  <UiAlertDialog
    :open="current !== undefined"
    default-open
    @update:open="current = undefined"
  >
    <UiAlertDialogContent
      class="w-4/5 md:w-full"
      @interact-outside="current = undefined"
    >
      <UiAlertDialogHeader>
        <UiAlertDialogTitle class="text-sm">
          {{ current?.data.title }}
        </UiAlertDialogTitle>
        <UiAlertDialogDescription>
          {{ current?.data.message }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter class="gap-y-4 sm:justify-center sm:gap-x-20">
        <UiButton variant="outline" @click="handleCancel()">
          {{ current?.data.cancelText ?? "Cancel" }}
        </UiButton>
        <UiButton
          ref="confirmButtonRef"
          variant="outline"
          @click="handleConfirm()"
        >
          {{ current?.data.confirmText ?? "Confirm" }}
        </UiButton>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
