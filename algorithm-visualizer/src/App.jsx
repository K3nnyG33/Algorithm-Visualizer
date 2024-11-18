import { useState } from 'react'
import Visualizer from "./components/Visualizer";
import InputForm from "./components/InputForm";
import { bubbleSort } from "./algorithms/sorting/bubbleSort";
import './App.css'

function App() {
  const [data, setData] = useState([]);
  return (
      <div>
          <h1>Algorithm Visualizer</h1>
          <InputForm onSubmit={setData} />
          <Visualizer algorithm={bubbleSort} data={data} />
      </div>
  );
}

export default App
