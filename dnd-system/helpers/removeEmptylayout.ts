import { ISection } from "../interface"

const removeEmptyColumn = (layouts: ISection[]) => {
  return layouts.map((section) => {
    const newColumns = section.columns.filter(
      (col) => (col.childIds.length || 0) > 0
    )
    return {
      ...section,
      columns: newColumns
    }
  })
}
export const removeEmptyLayout = (layouts: ISection[]) => {
  const notEmptyCol = removeEmptyColumn(layouts)
  return notEmptyCol.filter((section) => section.columns.length > 0)
}
