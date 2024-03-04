/**
 * Remove the chance for the given keys to be null by making them undefined if null.
 * @param obj The object to update
 * @param keys The keys to remove nullability from
 * @returns The updated object
 */
export default function removeNull<T extends object, K extends keyof T>(obj: T, ...keys: K[]) {
  const clone = structuredClone(obj)

  for (const key of keys) {
    if (clone[key] !== null) continue
    delete clone[key]
  }

  return clone as T & { [P in K]?: NonNullable<T[P]> }
}
