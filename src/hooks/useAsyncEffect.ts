import { useEffect } from 'react';

const useAsyncEffect = (effect: () => void, inputs: any = []): void => {
  useEffect(() => {
    effect();
  }, inputs);
};

export default useAsyncEffect;
