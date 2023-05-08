import { ToastContentPropsType } from './types';
import classNames from 'classnames';

const ToastContent: React.FC<ToastContentPropsType> = ({ error, text }) => {
  return (
    <>
      <span
        className={classNames(
          {
            'icon-close-circle-filled text-errorSecondary': error,
            'icon-checkmark-circle text-green': !error
          },
          'mr-5 text-xl relative top-1'
        )}
      ></span>
      {text}
    </>
  );
};

export default ToastContent;
