import { FormEvent, useEffect, useState } from "react"

import { mockData } from "../data/data"
import {
  LayoutContainer,
  ILayoutSection,
  createLayout,
  changeSectionStyles
} from "react-layouts-builder"
import { storage } from "../localSorage"
import { v4 as uuidv4 } from "uuid"
import "react-layouts-builder/packages/index.css"
import { ChangeEvent } from "react"

export const Layouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([])
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(true)
  const [clickSection, setclickSection] = useState<ILayoutSection>()
  const [disableChange, setDisableChange] = useState<boolean>(false)
  const handleLayoutChange = (layouts: ILayoutSection[]) => {
    storage.set(layouts)
    // setLayoutTest(layouts)
  }
  useEffect(() => {
    const l = storage.get()
    console.log("ta", l)

    if (!l && !l?.length && data.length > 0) {
      const c = createLayout(data, "id")
      setLayoutTest(c)
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)

    if (l?.length > 0) {
      setLayoutTest(l)
    }
  }, [data])

  const handleSabmit = (e: FormEvent) => {
    e.preventDefault()
    const newData = {
      id: uuidv4(),
      text: value,
      group: "",
      bg: "#0002"
    }
    setData((prev) => prev.concat(newData))

    setValue("")
  }
  useEffect(() => {
    setData(mockData)
  }, [])

  const changeBg = (color: string) => {
    if (clickSection) {
      const change = changeSectionStyles(layoutTest, clickSection.id, {
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

        const change = changeSectionStyles(layoutTest, clickSection.id, {
          backgroundImage: ev.target?.result
        })

        setLayoutTest(change)
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  return (
    <div>
      <button onClick={() => setDisableChange(!disableChange)}>
        Toggle Disable change t
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
                >
                  <p>Data : {data.text}</p>
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
        </div>
      </div>
    </div>
  )
}
