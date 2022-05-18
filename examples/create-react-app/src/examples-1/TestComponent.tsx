import { useState } from "react"

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
}
export const TestComponent = (props: Props) => {
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
        <img
          src={props.data.img}
          alt=""
          width="400"
          style={{ width: "100%" }}
        />
      ) : (
        <p>Data : {props.data.text}</p>
      )}
    </div>
  )
}
