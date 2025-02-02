# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## token handling

`/auth/login` endpoint sends a token alongside the user data, token is saved in sessionStorage and sent on subsequent requests and user data is saved in a pinia store

## Form validation

On the client the forms are validated using `vee-validate` + `zod`,  the multi step form has each step separately validated before going to the next one.

On the server the requests are validated using `zod`

## "withConfirm" composable

It's good to have a shared composable to use when actions needs confirmation from the user first (like a delete button), which is the purpose of the `useAlert` composable. Usage is pretty straightForward

```ts
const { withConfirm } = useAlert()
const handleRemove = async (id: number) => {
  // this will show an alert dialog
  const confirm = await withConfirm({
    title: "Delete Entity",
    message: "Are you sure you want to delete this entity?",
    confirmText: "Delete",
    cancelText: "Cancel",
  })
  if (confirm) {
    // do stuff when the user confirms the alert dialog
  }
}
```

## Pinia Stores

`user` store to hold the user global state

`entity` store to hold the listings of the entities, holds the api methods needed and also stores a single entity (when visiting `/entity/:id`)

## Shadcn

`/app/components/ui` is generated by the shadcn cli, where you import components as needed. Like the Form Inputs. `app/components/Shared/Form` are wrappers for some of shadcn form components (including `app/components/Shared/Picture.vue` which somehow ended up outside the `Form` folder)

## Image Upload component

`app/components/Shared/Picture.vue` The picture component allowed drag & dropping any image type or simply just clicking on the component and selecting files through the OS's native window

Image component is purely client side,  nothing is sent or  validated on the server

## Handling Permissions

- the `hasPermission` util function compares the required permission something needs with the available user permissions.

- the `<HasPermission />` component renders it's slot if the permissions is met (using `hasPermission` util function), or renders a fallback slot (`<template #fallback>fallback</template>`) if provided or simply renders nothing.

- the `permission.global.ts` middleware,  a global route middleware that checks the permissions defined on a route to meta,  also uses `hasPermission` util function.
If a route required permission X but the user doesn't have it,  it will deny access.
currently I'm redirecting back to the login screen but the behavior is highly customizable, like redirecting to a different route or specifying the redirect route also in the route meta.

## api handling

`app/plugins/01.api.ts` is a `$fetch` wrapper and `/app/composables/api.ts` is a `useFetch` wrapper.
both of these handle sending the token alongside the request.
