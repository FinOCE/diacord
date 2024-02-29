type CheckMissing<U extends readonly any[], T extends Record<string, any>> = {
  [K in keyof Required<T>]: K extends U[number] ? never : K
}[keyof T] extends never
  ? U
  : U & "Error: missing key"

type CheckDuplicate<U extends readonly any[]> = {
  [P1 in keyof U]: "_flag_" extends {
    [P2 in keyof U]: P2 extends P1 ? never : U[P2] extends U[P1] ? "_flag_" : never
  }[keyof U]
    ? [U[P1], "Error: duplicate"]
    : U[P1]
}

/**
 * Modified based off https://stackoverflow.com/a/60932900 (variant 2)
 */
export default <T extends Record<string, any>>() =>
  <U extends readonly (keyof T)[] | [keyof T]>(...u: U & CheckMissing<U, T> & CheckDuplicate<U>): U =>
    u
