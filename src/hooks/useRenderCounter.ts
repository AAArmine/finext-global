import { useRef } from 'react';
const useRenderCounter = (componentName: string) => {
  const counter = useRef(0);
  counter.current++;
  console.log(`${componentName} rendered ${counter.current} times`);
};
export default useRenderCounter;
