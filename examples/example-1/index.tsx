import { FormEvent, useEffect, useState } from 'react';
import { DNDContainer, ISection } from 'react-layouts-dnd';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from './mock';
import { storage } from './storage';
import 'react-layouts-dnd/packages/index.css';

function App() {
  const [layoutTest, setLayoutTest] = useState<ISection[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const handleLayoutChange = (layouts: ISection[]) => {
    storage.set(layouts);
    // setLayoutTest(layouts)
  };
  useEffect(() => {
    const l = storage.get();
    console.log(l);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (l?.length > 0) {
      setLayoutTest(l);
    }
  }, []);

  const handleSabmit = (e: FormEvent) => {
    e.preventDefault();
    const newData = {
      id: uuidv4(),
      text: value,
      group: '',
      bg: '#0002',
    };
    setData((prev) => prev.concat(newData));

    setValue('');
  };
  useEffect(() => {
    setData(mockData);
  }, [mockData]);

  return (
    <div>
      <h2 className="text-center text-bold">DND Custom</h2>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <DNDContainer
            data={data}
            stableDataKey="id"
            layouts={layoutTest}
            onLayoutChange={handleLayoutChange}
            renderComponent={(data) => {
              return (
                <div
                  key={data.id}
                  className="min-h-[50px] h-full p-2"
                  style={{
                    background: data.bg,
                  }}
                >
                  <p>Data : {data.text}</p>
                </div>
              );
            }}
          />
        )}
      </div>
      <div>
        <div className="bg-gray-200 w-4"></div>
        <div className="flex-grow">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus eligendi qui repellat ratione. Labore molestias
          dolores, recusandae quaerat ullam saepe, reiciendis aliquam
          veniam delectus corporis incidunt omnis officia modi beatae?
        </div>
        <div className="bg-gray-200 p-2 text-center">
          <form onSubmit={handleSabmit}>
            <textarea
              name="data"
              cols={30}
              rows={10}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
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
  );
}

export default App;
