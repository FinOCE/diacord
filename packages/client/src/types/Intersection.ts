export type Intersection<T extends object[]> = {
  [P in keyof T[number]]: T[number][P]
}
