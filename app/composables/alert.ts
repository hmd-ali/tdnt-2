export type AlertDialogProps = {
  data: {
    title: string
    message: string
    confirmText?: string
    cancelText?: string
  }
  resolve: (result: boolean) => void
}
export type AlertClientDialogProps = {
  data: {
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
  }
  resolve: (result: boolean) => void
}

const current = ref<AlertDialogProps>()

const withConfirm = (data: AlertDialogProps["data"]) =>
  new Promise<boolean>((resolve) => {
    current.value = { data, resolve }
  })

export const useAlert = () => ({
  current,
  withConfirm,
})
