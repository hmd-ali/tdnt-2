export type Entity = {
  firstName: string
  lastName: string
  dob: string
  maritalStatus: MaritalStatus
  address: string | null
  phone: string
  profilePicture: string | null
  gender: Gender
  id: number
}

export const MaritalStatus = {
  SINGLE: "Single",
  MARRIED: "Married",
  DIVORCED: "Divorced",
  WIDOWED: "Widowed",
  SEPARATED: "Separated",
} as const

export type MaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus]

export const Gender = {
  Male: "Male",
  Female: "Female",
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]
