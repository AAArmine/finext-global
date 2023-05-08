import { UploadFile } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

export type ControlledInputFilePropsType = {
  label?: string;
  name: string;
  onUploadChange: (info: UploadChangeParam<UploadFile<any>>) => void;
};
