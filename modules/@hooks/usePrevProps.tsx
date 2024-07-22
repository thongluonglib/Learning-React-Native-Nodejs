import {useEffect, useRef} from 'react';

// value can be prop or state
const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export default usePrevious;
