export type Rename<T extends object, U extends Partial<Record<keyof T, PropertyKey>>> = Omit<T, keyof U> & {
  [K in keyof U as NonNullable<U[K]>]: K extends keyof T ? T[K] : never
}
