import { CSSProperties, ReactNode } from "react"

export interface ILayoutColumn {
  sectionKey: string
  columnCount: number
  dataKey: string
  data: any
}
export interface ILayout {
  sectionKey: string
  sectionOrder: number
  columnsDataKeys: string[]
  dataKey: string
}

export interface IColumn {
  id: any
  order: number
  childIds: (string | number)[]
  className?: string
  styles?: CSSProperties
  width: number
}
export interface ISection {
  id: any
  order: number
  columns: IColumn[]
  className: string
}

export interface IDNDContainer {
  data: any[]
  stableDataKey: string
  renderComponent: (data: any) => ReactNode | JSX.Element
  onLayoutChange: (data: ISection[]) => void
  layouts?: ISection[]
  loading?: boolean
}
