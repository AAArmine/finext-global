import { DownloadDocItemPropsType } from './types';

const DownloadDocItem: React.FC<DownloadDocItemPropsType> = ({ title }) => {
  return (
    <div className="w-1/3 py-3 pr-3 flex cursor-pointer">
      <span className="icon-export mr-3 text-green text-2xl relative bottom-1" />
      <span className="font-bold underline">{title}</span>
    </div>
  );
};

export default DownloadDocItem;
