```bash 
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
```
