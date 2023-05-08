import classNames from 'classnames';
import { TitlePropsType } from './types';

export const Title: React.FC<TitlePropsType> = ({
  text,
  underline = false,
  color = 'default',
  sizeClass = 'text-lg',
  ...rest
}) => {
  return (
    <p
      className={classNames({
        'text-green': color == 'green',
        'text-secondary': color == 'default',
        underline,
        [sizeClass]: true,
        'font-black': true,
        [rest.className]: true
      })}
    >
      {text}
    </p>
  );
};
