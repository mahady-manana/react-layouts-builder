export const storage = {
  get: () => {
    const test = localStorage.getItem("layout_storybook")
    if (!test) return
    return JSON.parse(test)
  },
  set: (data: any) => {
    localStorage.setItem("layout_storybook", JSON.stringify(data))
  }
}
