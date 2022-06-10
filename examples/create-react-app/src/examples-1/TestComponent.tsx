import React from "react"
import { useState } from "react"
import { ComponentTestts } from "./ComponentTest"

interface Props {
  data:
    | {
        id: number
        text: string
        group: string
        bg: string
        img: string
        size: number
      }
    | {
        id: number
        text: string
        group: string
        bg: string
        img?: undefined
        size?: undefined
      }
    | {
        id: number
        text: string
        group: string
        bg: string
        img: string
        size?: undefined
      }

  onClick: (data: any) => void
  focused?: boolean
  component?: any
}

export const TestComponent = React.memo((props: Props) => {
  console.log("This if rerender", props.data.id)
  return (
    <div
      key={props.data.id}
      className="min-h-[50px] h-full p-2"
      style={{
        border: props.focused ? "1px solid #000" : ""
      }}
      onClick={() => props.onClick(props.data)}
    >
      {props.data.img ? (
        <img src={props.data.img} alt="" width="400" style={{ width: 100 }} />
      ) : (
        <p>Data : {props.data.text}</p>
      )}
      <ComponentTestts data={props.data} />
    </div>
  )
})
