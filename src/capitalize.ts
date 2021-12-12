/* eslint-disable import/prefer-default-export */
export const capitalize = (value: string): string => {
  if (!value.length) return value
  return `${value[0].toUpperCase()}${value.slice(1)}`
}
