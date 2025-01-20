// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@vee-validate/nuxt"],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Field: "VeeField",
      Form: "VeeForm",
      ErrorMessage: "VeeErrorMessage",
      FieldArray: "VeeFieldArray",
    },
  },
  ssr: false,
})
