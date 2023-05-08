import { InputHTMLAttributes } from 'react';
import type { UploadProps } from 'antd';

export interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  wrapperClass?: string;
  showErrorText?: boolean;
  onUploadChange: UploadProps['onChange'];
}
