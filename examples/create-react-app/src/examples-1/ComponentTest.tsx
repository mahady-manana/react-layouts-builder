import React from "react"
import { FC } from "react"
import { InnerLayouts1 } from "./InnerContainer"

export const ComponentTestts: FC<any> = React.memo(({ data }) => {
  return (
    <div>
      {/* {data.isCont ? <InnerLayouts1 /> : 
      } */}
      <p>This is data: {data.id}</p>
    </div>
  )
})
