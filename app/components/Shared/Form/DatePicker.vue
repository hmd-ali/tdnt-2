<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
  DateFormatter,
  parseDate,
  CalendarDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date"
import { CalendarIcon } from "lucide-vue-next"
import { toDate } from "radix-vue/date"

defineProps<{
  label?: string
  placeholder?: string
  minValue?: CalendarDate
  maxValue?: CalendarDate
  description?: string
}>()

const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

const innerPlaceholder = ref()

const model = defineModel<string | undefined>({
  required: true,
})

const innerValue = computed({
  get: () => (model.value ? parseDate(model.value) : undefined),
  set: (val) => val,
})
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiFormControl>
        <UiButton
          variant="outline"
          type="button"
          :class="
            cn(
              'w-[240px] ps-3 text-start font-normal flex',
              !innerValue && 'text-muted-foreground',
            )
          "
        >
          <span>{{
            innerValue
              ? df.format(toDate(innerValue))
              : (placeholder ?? "Pick a date")
          }}</span>
          <CalendarIcon class="ms-auto size-4 opacity-50" />
        </UiButton>
        <input type="hidden" />
      </UiFormControl>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-auto p-0">
      <UiCalendar
        v-model:placeholder="innerPlaceholder"
        v-model="innerValue"
        :calendar-label="label ?? 'Date'"
        :min-value="minValue ?? new CalendarDate(1900, 1, 1)"
        :max-value="maxValue ?? today(getLocalTimeZone())"
        @update:model-value="
          (v) => {
            if (v) {
              model = v.toString()
            } else {
              model = undefined
            }
          }
        "
      />
    </UiPopoverContent>
  </UiPopover>
</template>
