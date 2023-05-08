import { forwardRef } from 'react';
import styles from './InputFile.module.scss';
import classNames from 'classnames';
import { Typography } from 'antd';
import { Form, Button, Upload } from 'antd';
import { InputFileProps } from './types';

const { Text } = Typography;
// eslint-disable-next-line react/display-name
const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (
    { error, label = '', wrapperClass, showErrorText = true, onUploadChange },
    ref
  ) => {
    return (
      <div className={classNames(wrapperClass, styles.container)}>
        <Form.Item>
          <Upload
            maxCount={1}
            beforeUpload={() => {
              return false;
            }}
            listType="picture"
            onChange={onUploadChange}
            {...ref}
          >
            <div className="font-bold text-left">{label}</div>
            <Button
              className={classNames(
                styles.uploadBtn,
                'text-light font-normal px-2',
                {
                  'border-error': error
                }
              )}
            >
              Upload
              <span className="icon-upload text-green text-2xl text-right w-full relative bottom-[26px]"></span>
            </Button>
          </Upload>
          {error && showErrorText && (
            <Text className="text-error text-left font-normal block">
              {error}
            </Text>
          )}
        </Form.Item>
      </div>
    );
  }
);

export default InputFile;
