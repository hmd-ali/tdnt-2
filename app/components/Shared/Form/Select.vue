<script setup lang="ts" generic="T">
const model = defineModel<T>({
  required: true,
})

const props = defineProps<{
  placeholder?: string
  options: T[]
  modelValueBy: (option: T) => string
  displayValue: (option: T) => string
}>()

const innerModel = computed({
  get: () => props.modelValueBy(model.value),
  set: (value: string) => {
    model.value = props.options.find(
      (option) => props.modelValueBy(option) === value,
    ) as T
  },
})
</script>

<template>
  <UiSelect v-model="innerModel">
    <UiFormControl>
      <UiSelectTrigger>
        <UiSelectValue :placeholder="placeholder ?? 'Select a value'" />
      </UiSelectTrigger>
    </UiFormControl>
    <UiSelectContent>
      <UiSelectItem
        v-for="option in options"
        :key="modelValueBy(option)"
        :value="modelValueBy(option)"
      >
        {{ displayValue(option) }}
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>
