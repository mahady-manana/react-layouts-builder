export const sortLayoutLayerOrder = (key: string) => {
  return (a: any, b: any) => a[key] - b[key]
}
