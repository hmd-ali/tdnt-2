// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Field: "VeeField",
      Form: "VeeForm",
      ErrorMessage: "VeeErrorMessage",
      FieldArray: "VeeFieldArray",
    },
  },

  shadcn: {
    prefix: "Ui",
    componentDir: "./app/components/ui",
  },

  ssr: false,
})
