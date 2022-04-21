import { FormEvent, useEffect, useState } from "react"

import { mockData } from "../data/data"
import {
  LayoutContainer,
  ILayoutSection,
  createLayout
} from "react-layouts-builder"
import { storage } from "../localSorage"
import { v4 as uuidv4 } from "uuid"
import "react-layouts-builder/packages/index.css"

export const Layouts1 = () => {
  const [layoutTest, setLayoutTest] = useState<ILayoutSection[]>([])
  const [data, setData] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(true)
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
            renderComponent={(data) => {
              return (
                <div
                  key={data.id}
                  className="min-h-[50px] h-full p-2 border-2 border-gray-800"
                  style={{
                    background: data.bg
                  }}
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
