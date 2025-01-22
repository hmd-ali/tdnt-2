<script setup lang="ts">
import { UiFormField } from "#components"
import { CheckIcon, CircleIcon, DotIcon } from "lucide-vue-next"
import { Gender, MaritalStatus, type Entity } from "~~/types/entity"
import type { CombinedZodSchema } from "~~/types/zod"
import type { Path } from "vee-validate"
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js/min"
import { entitySchema } from "~~/validations/entity"

const props = defineProps<{
  data?: Entity
}>()

const emit = defineEmits<{
  submit: [FormInput]
}>()

export type FormInput = CombinedZodSchema<typeof entitySchema>

const validationSchema = entitySchema.map((schema) => toTypedSchema(schema))
const onSubmit = (values: FormInput) => {
  emit("submit", values)
}

const stepIndex = ref(1)

const steps = [
  {
    step: 1,
    title: "Personal Information",
    description: "Enter your personal information",
  },
  {
    step: 2,
    title: "Contact Information",
    description: "Enter your contact information",
  },
  {
    step: 3,
    title: "Additional Information",
    description: "Enter your additional information",
  },
]

const currentSchema = computed(() => validationSchema[stepIndex.value - 1])
const initialValues = computed<FormInput | undefined>(() => {
  if (props.data === undefined) return
  return props.data
})
const { meta, values, validate, setFieldValue } = useForm<FormInput>({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
})

watch(
  stepIndex,
  () => {
    if (initialValues.value === undefined) return
    for (const [key, value] of Object.entries(initialValues.value)) {
      const currentValue = values[key as Path<FormInput>]
      if (currentValue === undefined) {
        setFieldValue(key as Path<FormInput>, value)
      }
    }
  },
  { immediate: true },
)

const displayPhoneNumber = (value: string) => {
  return isValidPhoneNumber(value, { defaultCountry: "LB" })
    ? parsePhoneNumber(value, "LB").formatInternational()
    : value
}
const getPhoneNumber = (value: string) => {
  return isValidPhoneNumber(value, { defaultCountry: "LB" })
    ? parsePhoneNumber(value, "LB").number
    : value
}
</script>

<template>
  <UiStepper
    v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
    v-model="stepIndex"
    class="block w-full"
  >
    <form
      @submit.prevent="
        () => {
          validate()
          if (stepIndex === steps.length && meta.valid) {
            onSubmit(values)
          }
        }
      "
    >
      <div class="flex w-full gap-2">
        <UiStepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full flex-col items-center justify-center"
          :step="step.step"
        >
          <UiStepperSeparator
            v-if="step.step !== steps.length"
            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />
          <UiStepperTrigger as-child>
            <UiButton
              :variant="
                state === 'completed' || state === 'active'
                  ? 'default'
                  : 'outline'
              "
              size="icon"
              class="z-10 shrink-0 rounded-full"
              :class="[
                state === 'active' &&
                  'ring-2 ring-ring ring-offset-2 ring-offset-background',
              ]"
              :disabled="state !== 'completed' && !meta.valid"
            >
              <CheckIcon v-if="state === 'completed'" class="size-5" />
              <CircleIcon v-else-if="state === 'active'" />
              <DotIcon v-else />
            </UiButton>
          </UiStepperTrigger>
          <div class="mt-5 hidden flex-col items-center text-center md:flex">
            <UiStepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              {{ step.title }}
            </UiStepperTitle>
            <UiStepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}</UiStepperDescription
            >
          </div>
        </UiStepperItem>
      </div>
      <div class="mt-4 flex flex-col gap-4">
        <p class="md:hidden">{{ steps[stepIndex - 1]?.title }}</p>
        <template v-if="stepIndex === 1">
          <UiFormField v-slot="{ componentField }" name="firstName">
            <UiFormItem>
              <UiFormLabel>First Name</UiFormLabel>
              <UiFormControl>
                <UiInput v-bind="componentField" placeholder="First Name" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="lastName">
            <UiFormItem>
              <UiFormLabel>Last Name</UiFormLabel>
              <UiFormControl>
                <UiInput v-bind="componentField" placeholder="Last Name" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ field, handleChange }" name="gender">
            <UiFormItem>
              <UiFormLabel>Gender</UiFormLabel>
              <SharedFormSelect
                :model-value="field.value"
                :options="Object.values(Gender)"
                :model-value-by="String"
                :display-value="String"
                @update:model-value="handleChange"
              />
            </UiFormItem>
          </UiFormField>
        </template>
        <template v-if="stepIndex === 2">
          <UiFormField v-slot="{ field, handleChange }" name="phone">
            <UiFormItem>
              <UiFormLabel>Phone</UiFormLabel>
              <UiFormControl>
                <UiInput
                  :model-value="displayPhoneNumber(field.value)"
                  placeholder="Phone"
                  @input="handleChange(getPhoneNumber($event.target.value))"
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ field, handleChange }" name="dob">
            <UiFormItem>
              <UiFormLabel>Date of Birth</UiFormLabel>
              <p>value: {{ field.value }}</p>
              <SharedFormDatePicker
                :model-value="field.value"
                @update:model-value="handleChange"
              />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </template>
        <template v-if="stepIndex === 3">
          <UiFormField v-slot="{ field, handleChange }" name="maritalStatus">
            <UiFormItem>
              <UiFormLabel>Marital Status</UiFormLabel>
              <SharedFormSelect
                :model-value="field.value"
                :options="Object.values(MaritalStatus)"
                :model-value-by="String"
                :display-value="String"
                @update:model-value="handleChange"
              />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="address">
            <UiFormItem>
              <UiFormLabel>Address</UiFormLabel>
              <UiFormControl>
                <UiInput v-bind="componentField" placeholder="Address" />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <UiFormField v-slot="{ componentField }" name="profilePicture">
            <UiFormItem>
              <UiFormLabel>Profile Picture</UiFormLabel>
              <UiFormControl>
                <UiInput
                  v-bind="componentField"
                  placeholder="Profile Picture"
                />
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
          <SharedPicture :data="null" />
        </template>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <UiButton
          :disabled="isPrevDisabled"
          variant="outline"
          size="sm"
          @click="prevStep()"
        >
          Back
        </UiButton>
        <div class="flex items-center gap-3">
          <UiButton
            v-if="stepIndex !== 3"
            :type="meta.valid ? 'button' : 'submit'"
            :disabled="isNextDisabled"
            size="sm"
            @click="meta.valid && nextStep()"
          >
            Next
          </UiButton>
          <UiButton v-if="stepIndex === 3" size="sm" type="submit">
            Submit
          </UiButton>
        </div>
      </div>
    </form>
  </UiStepper>
</template>
