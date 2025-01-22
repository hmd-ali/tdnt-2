<script setup lang="ts">
import { Trash2Icon } from "lucide-vue-next"
import { ref } from "vue"
import { toast } from "vue-sonner"

const props = defineProps<{
  data: string | null
}>()

const preview = ref<string | null>(props.data)

const emit = defineEmits<{
  "change:preview": [string | null]
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files !== undefined && files[0]) {
    handleFile(files[0])
  }
}

const handleRemoveFile = () => {
  preview.value = null
  if (fileInput.value) {
    fileInput.value.value = ""
  }
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files !== null && files[0]) {
    handleFile(files[0])
  }
}

const handleFile = (file: File) => {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader()
    reader.onload = (e) => {
      preview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  } else {
    toast.error("Please upload an image file")
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

watch(
  preview,
  (value) => {
    emit("change:preview", value)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div class="w-full">
    <div
      class="relative size-full rounded-lg border-2 border-dashed p-8 text-center transition-colors"
      :class="[
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-input hover:border-primary',
      ]"
      tabindex="0"
      role="button"
      aria-label="Click or drag and drop to upload an image"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="sr-only"
        aria-hidden="true"
        @change="handleFileInput"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto mb-4 size-12 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p class="mb-4 text-sm text-muted-foreground">
        Drag and drop your image here, or click to select
      </p>
      <UiButton type="button" variant="outline" @click.stop="triggerFileInput">
        Choose File
      </UiButton>
      <div v-if="preview" class="absolute inset-0">
        <UiButton
          type="button"
          variant="destructive"
          class="absolute end-2 top-2 size-5 p-2"
          @click.stop="handleRemoveFile"
        >
          <Trash2Icon class="!size-3" />
        </UiButton>
        <img class="size-full object-cover" :src="preview" />
      </div>
    </div>
  </div>
</template>
