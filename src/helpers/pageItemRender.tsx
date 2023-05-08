import { ReactNode } from 'react';

export const itemRender = (
  _: number,
  type: string,
  originalElement: ReactNode
) => {
  const style = 'text-2xl ml-2 relative bottom-[4px]';
  if (type === 'prev') {
    return (
      <a>
        <span className={`${style} icon-arrow-left-circle`} />
      </a>
    );
  }
  if (type === 'next') {
    return (
      <a>
        <span className={`${style} icon-arrow-right-circle`} />
      </a>
    );
  }
  return originalElement;
};
