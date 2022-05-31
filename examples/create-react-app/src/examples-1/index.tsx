import { FormEvent, useEffect, useState } from "react"

import { mockData } from "../data/data"
import {
  LayoutContainer,
  ILayoutSection,
  createLayout,
  createNewSection,
  changeSectionStyles,
  addToRow,
  addToItem
} from "react-layouts-builder"
import { storage } from "../localSorage"
import "react-layouts-builder/packages/index.css"
import { ChangeEvent } from "react"
import { TestComponent } from "./TestComponent"

export const Layouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([])
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [nodata, setnodata] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [focused, setFocused] = useState<any>()

  const [clickSection, setclickSection] = useState<ILayoutSection>()
  const [staticss, setStaticss] = useState<boolean>(false)
  const [disableChange, setDisableChange] = useState<boolean>(false)
  const [focusItem, setFocusItem] = useState<any>()
  const handleLayoutChange = (layouts: ILayoutSection[]) => {
    setLayoutTest(layouts)
  }
  useEffect(() => {
    const l = storage.get()

    setTimeout(() => {
      if (l?.length > 0) {
        setLayoutTest(l)
      } else {
        setnodata(true)
      }
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!loading && nodata && data) {
      const c = createLayout(data, "id", undefined, { width: 1024 })
      setLayoutTest(c)
    }
  }, [loading, data, nodata])

  const handleSabmit = (e: FormEvent) => {
    e.preventDefault()

    const newSection = createNewSection(["EMPTY_SECTION"])
    setLayoutTest((prev) => prev.concat(newSection))
    setValue("")
  }
  useEffect(() => {
    setData(mockData)
  }, [])

  const changeBg = (color: string) => {
    if (clickSection) {
      const l = storage.get()
      const change = changeSectionStyles(l, clickSection.id, {
        backgroundColor: color
      })

      setLayoutTest(change)
    }
  }
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (clickSection) {
        console.log(ev.target?.result)

        const l = storage.get()
        const change = changeSectionStyles(l, clickSection.id, {
          backgroundImage: ev.target?.result
        })

        setLayoutTest(change)
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const addToRowItem = () => {
    const l = storage.get()
    const newitems = {
      id: "dklfmqljfhmlgjq",
      text: "lorem text ipsum"
    }

    const newLayouts = addToRow(l, clickSection?.id, "dklfmqljfhmlgjq")
    setLayoutTest(newLayouts)
    setData((prev) => prev.concat(newitems))
  }
  const onFocus = (items: any) => {
    setFocusItem(items)
  }

  const addToItemss = () => {
    const newitems = {
      id: "dklfmqlj46346fhmlgjq",
      text: "lorem text ipsum"
    }
    const add = addToItem(layoutTest, newitems.id, {
      sectionId: focusItem.sectionId,
      columnId: focusItem.columnId,
      itemKey: focusItem.itemKey,
      rowId: focusItem.rowId
    })

    setLayoutTest(add)
    setData((prev) => prev.concat(newitems))
  }

  const imageCheckerFn = (items: any) => {
    return items.img ? true : false
  }
  return (
    <div>
      <button onClick={() => setDisableChange(!disableChange)}>
        Toggle Disable change t 000 : {disableChange ? "YES" : "NO"}
      </button>

      <div
        style={{
          display: "flex",
          position: "relative",
          left: 334,
          width: "max-content"
        }}
      >
        {Array.from(Array(10).keys()).map((index) => {
          return (
            <div
              key={index}
              style={{
                width: 100,
                background: `#000${index}`,
                borderLeft: "1px solid"
              }}
            >
              <span>{index}0 %</span>
            </div>
          )
        })}
      </div>
      <div
        id="container_layout_scroll"
        style={{ height: "88vh", overflowY: "scroll" }}
      >
        {loading ? (
          <div>loading...</div>
        ) : (
          <LayoutContainer
            data={data}
            disableChange={disableChange}
            stableDataKey="id"
            layouts={layoutTest}
            staticComponent={staticss}
            onLayoutChange={handleLayoutChange}
            onClickSection={(section) => setclickSection(section)}
            onFocusItem={onFocus}
            imageCheckerFn={imageCheckerFn}
            imageSizeFnLoader={(item) => item.size}
            onImageResizeFinished={(item, w) => console.log(item, w)}
            renderComponent={(data) => {
              return (
                <TestComponent
                  data={data}
                  onClick={(d) => setFocused(d.id)}
                  focused={data.id === focused}
                />
              )
            }}
          />
        )}
      </div>
      <div>
        <div className="bg-gray-200 w-4"></div>
        <div>
          Click section :<p>{clickSection?.id}</p>
          <p>{clickSection?.rows.length}</p>
          <input type="color" onChange={(e) => changeBg(e.target.value)} />
          <input type="file" onChange={handleFile} />
        </div>
        <div></div>
        <button onClick={() => addToItemss()}>Add item</button>
        <div className="flex-grow text-center">Add new item</div>
        <div className="bg-gray-200 p-2 text-center">
          <form onSubmit={handleSabmit}>
            <textarea
              name="data"
              cols={30}
              rows={10}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            ></textarea>
            <div>
              <button
                className="btn border-2 border-gray-500 p-2"
                type="submit"
              >
                Add new item
              </button>
            </div>
          </form>
          <button onClick={() => addToRowItem()}>Ad items</button>
        </div>
      </div>
    </div>
  )
}
