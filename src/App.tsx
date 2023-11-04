import { useState } from "react";
import "./App.css";
import { Slider } from "./Slider";
import { Shop } from "./Shop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Slider></Slider>
      <Shop></Shop>
    </div>
  );
}

export default App;
