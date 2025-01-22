import type { z } from "zod"

export type CombinedZodSchema<T extends readonly z.ZodTypeAny[]> =
  UnionToIntersection<
    {
      [K in keyof T]: T[K] extends z.ZodTypeAny ? z.infer<T[K]> : never
    }[number]
  >

export type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never
