import { CSSProperties } from "react"

export interface IRenderableLayout {
  id: any
  className?: string
  order: number
  columns: IRenderableColumn[]
}
export interface IRenderableColumn {
  id: any
  className?: string
  order: number
  items: any[]
  styles?: CSSProperties
  width: number
}
export interface IRenderableColmumnItem {
  id: any
  data: any
}
