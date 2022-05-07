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
import { v4 as uuidv4 } from "uuid"
import "react-layouts-builder/packages/index.css"
import { ChangeEvent } from "react"

export const Layouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([])
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [nodata, setnodata] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [clickSection, setclickSection] = useState<ILayoutSection>()
  const [disableChange, setDisableChange] = useState<boolean>(false)
  const [focusItem, setFocusItem] = useState<any>()
  const handleLayoutChange = (layouts: ILayoutSection[]) => {
    storage.set(layouts)
    // setLayoutTest(layouts)
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
    console.log(add)

    setLayoutTest(add)
    setData((prev) => prev.concat(newitems))
  }

  return (
    <div>
      <button onClick={() => setDisableChange(!disableChange)}>
        Toggle Disable change t 000
      </button>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <LayoutContainer
            data={data}
            disableChange={disableChange}
            stableDataKey="id"
            layouts={layoutTest}
            onLayoutChange={handleLayoutChange}
            onClickSection={(section) => setclickSection(section)}
            onFocusItem={onFocus}
            renderComponent={(data) => {
              return (
                <div
                  key={data.id}
                  className="min-h-[50px] h-full p-2"
                  style={
                    {
                      // background: data.bg
                    }
                  }
                >{
                  data.img ? <img src={data.img} alt='' width="400" style={{width: "100%"}}/>
                 : <p>Data : {data.text}</p>
                }
                </div>
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
