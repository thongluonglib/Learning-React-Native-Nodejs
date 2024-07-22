```bash 
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [count, setCount] = useState(0);

  return <Counter countProps={count} setCountProps={setCount} />;
};

const Counter = props => {
  const { countProps, setCountProps } = props;

  useEffect(() => {
    console.log("mounted or updated");
  });

  const prevCountProps = usePrevious(countProps);

  return (
    <>
      <p>{countProps}</p>
      <p>{prevCountProps}</p>
      <button onClick={() => setCountProps(countProps + 1)}>+</button>
      <button onClick={() => setCountProps(countProps - 1)}>-</button>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
```
