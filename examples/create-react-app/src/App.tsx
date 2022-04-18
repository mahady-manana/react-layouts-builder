import "./App.css"
import { Layouts1 } from "./examples-1"

function App() {
  return (
    <div className="flex bg-gray-100 p-5">
      <div className="w-[250px] bg-gray-200 border-2 border-gray-400">
        <h3 className="text-center p-2 text-2xl text-white	bg-gray-500">
          Menus
        </h3>
      </div>
      <div className="w-auto flex-grow bg-gray-100">
        <h3 className="text-center p-2 text-2xl text-white	bg-gray-500">
          React Layouts DND - Section - Row - Column System
        </h3>
        <div className="bg-gray-200">
          <Layouts1 />
        </div>
      </div>
    </div>
  )
}

export default App
