import {
  CSSProperties,
  DragEventHandler,
  SyntheticEvent,
  useEffect,
  useState
} from "react"

import "./App.css"
import { mockData as fakeData } from "./data/data"

function Test() {
  const [hoverEl, setHoverEl] = useState<any>()
  const [data, setData] = useState<
    { id: number; text: string; group: string }[]
  >([])
  const [draddedId, setDraddedId] = useState<any>()
  const [draggedElement, setDraggedElement] = useState<CSSProperties>({})
  const [grouped, setGrouped] = useState<{
    [x: string]: { id: number; text: string; group: string }[]
  }>({})
  useEffect(() => {
    if (data) {
      setData(fakeData)
    }
  }, [])

  const resetAllMove = () => {
    setHoverEl("")
    setDraddedId(undefined)
    setDraggedElement({})
  }
  const groupedData = () => {
    const group = data.reduce((acc, next) => {
      return {
        ...acc,
        [next.group]: [...(acc[next.group] || []), next]
      }
    }, {} as any)
    setGrouped(group)
  }

  useEffect(() => {
    if (data) {
      groupedData()
    }
  }, [data])

  const reorderGroup = (
    sourceId: any,
    sourceSection: string,
    destinationId: any,
    destinationSection: string,
    place: "LEFT" | "RIGHT"
  ) => {
    // do not remove if no destination found
    if (!destinationId || !destinationSection) return
    // remove from source
    const cloneOriginal = {
      ...grouped
    }

    const removedItem = (cloneOriginal[sourceSection] || []).find(
      (item) => item.id === sourceId
    )
    if (!removedItem) return

    cloneOriginal[sourceSection] = (cloneOriginal[sourceSection] || []).filter(
      (item) => item.id !== sourceId
    )

    cloneOriginal[destinationSection] = (
      cloneOriginal[destinationSection] || []
    ).reduce((acc, next) => {
      if (next.id !== destinationId) {
        return [...(acc || []), next]
      }
      if (place === "LEFT") {
        return [...acc, removedItem, next]
      }
      if (place === "RIGHT") {
        return [...(acc || []), next, removedItem]
      }
      return [...(acc || []), next]
    }, [] as any)

    setGrouped(cloneOriginal)
  }

  const onDragOver = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const x = (e as any).pageX
    const y = (e as any).pageY
    setDraggedElement((prev) => ({
      ...prev,
      position: "absolute",
      zIndex: 999999,
      left: x,
      top: y
    }))
    const targetEl = e.currentTarget
    const targetDom = targetEl.getAttribute("target-dom")
    setHoverEl(targetDom)
  }

  const onDrop = (
    e: any,
    section: string,
    id: any,
    place: "LEFT" | "RIGHT"
  ) => {
    e.preventDefault()
    setHoverEl("")
    const sourceId = e.dataTransfer.getData("id")
    const sourceSection = e.dataTransfer.getData("section")
    reorderGroup(parseFloat(sourceId), sourceSection, id, section, place)
  }

  const onDropToNewSection = (
    e: any,
    section: string,
    place: "TOP" | "BOTTOM"
  ) => {
    e.preventDefault()
    setHoverEl("")
    const sourceId = e.dataTransfer.getData("id")
    const sourceSection = e.dataTransfer.getData("section")
    // reorderGroup(parseFloat(sourceId), sourceSection, id, section, place)
    resetAllMove()
  }

  const onDragStart = (e: any, id: any, section: string) => {
    setDraddedId(id)
    e.dataTransfer.setData("id", id)
    e.dataTransfer.setData("section", section)
  }

  const onLeaveDroppableZone = (e: SyntheticEvent) => {
    e.preventDefault()
    setHoverEl("")
    resetAllMove()
  }

  const getGridLayout = (
    colNumber: number,
    left: boolean,
    right: boolean
  ): CSSProperties => {
    if (left)
      return {
        gridTemplateColumns: "50% auto 0px",
        width: `${100 / colNumber}%`
      }
    if (right)
      return {
        gridTemplateColumns: "0px auto 50%",
        width: `${100 / colNumber}%`
      }
    return {
      gridTemplateColumns: "0px auto 0px",
      width: `${100 / colNumber}%`
    }
  }

  return (
    <div className="max-w-[1080px] m-auto py-4">
      <div className="min-h-[100px] resize-x	 ">
        {Object.keys(grouped).map((group) => {
          return (
            <div key={group}>
              <div
                className={`h-[10px] relative min-w-[40px] z-50 ${
                  hoverEl === `${group}-top`
                    ? " border-2 border-dashed border-slate-900 rounded-sm"
                    : "-left-[40px]"
                } `}
                target-dom={`${group}-top`}
                onDragOver={onDragOver}
                onDrop={(e) => onDropToNewSection(e, group, "TOP")}
                onDragLeave={onLeaveDroppableZone}
              />
              <div key={group} className="my-2 bg-gray-200 p-2 flex">
                {grouped[group].map((data) => {
                  return (
                    <div
                      key={data.id}
                      className={`grid`}
                      style={getGridLayout(
                        grouped[group].length || 1,
                        hoverEl === `${group}-${data.id}-left`,
                        hoverEl === `${group}-${data.id}-right`
                      )}
                    >
                      <div
                        className={`h-full min-w-[40px] z-50 ${
                          hoverEl === `${group}-${data.id}-left`
                            ? " border-2 border-dashed border-slate-900 rounded-sm"
                            : ""
                        } `}
                        target-dom={`${group}-${data.id}-left`}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, group, data.id, "LEFT")}
                        onDragLeave={onLeaveDroppableZone}
                      />
                      <div
                        key={data.id}
                        target-dom={`${group}-${data.id}`}
                        // onDragOver={onDragOver}
                        // onDrop={(e) => onDrop(e, group, data.id, "BOTTOM")}
                        className="flex-grow"
                      >
                        <div
                          draggable
                          onDragStart={(e) => onDragStart(e, data.id, group)}
                          className="bg-gray-100 p-2 m-1"
                          target-dom={`${group}-${data.id}`}
                        >
                          <p>Data: {data.id}</p>
                          <p>Text: {data.text}</p>
                        </div>
                        {hoverEl === `${group}-${data.id}` ? (
                          <div className=" h-[10px] w-full border-2 border-dashed border-slate-900 rounded-sm"></div>
                        ) : null}
                      </div>
                      <div
                        className={`h-full relative min-w-[40px] z-50 ${
                          hoverEl === `${group}-${data.id}-right`
                            ? " border-2 border-dashed border-slate-900 rounded-sm"
                            : "-left-[40px]"
                        } `}
                        target-dom={`${group}-${data.id}-right`}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, group, data.id, "RIGHT")}
                        onDragLeave={onLeaveDroppableZone}
                      />
                    </div>
                  )
                })}
              </div>
              <div
                className={`h-[10px] relative min-w-[40px] z-50 ${
                  hoverEl === `${group}-bottom`
                    ? " border-2 border-dashed border-slate-900 rounded-sm"
                    : "-left-[40px]"
                } `}
                target-dom={`${group}-bottom`}
                onDragOver={onDragOver}
                onDrop={(e) => onDropToNewSection(e, group, "BOTTOM")}
                onDragLeave={onLeaveDroppableZone}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Test
