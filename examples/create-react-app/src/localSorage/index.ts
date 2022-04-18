export const storage = {
  get: () => {
    const test = localStorage.getItem("test")
    if (!test) return
    return JSON.parse(test)
  },
  set: (data: any) => {
    localStorage.setItem("test", JSON.stringify(data))
  }
}
