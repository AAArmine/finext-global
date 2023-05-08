import { FC } from 'react';
import { Modal } from 'antd';
import Button from 'components/Button';
import { PromptModalPropesType } from './types';
import classNames from 'classnames';

const buttons = {
  default: { left: 'No', right: 'Yes' },
  approve: { left: 'Cancel', right: 'Approve' },
  decline: { left: 'Cancel', right: 'Decline' },
  danger: { left: 'Cancel', right: 'Yes, delete' },
  reject: { left: 'Cancel', right: 'Yes, reject' },
  rejectReason: { left: 'Cancel', right: 'Reject' },
  submit: { left: 'Cancel', right: 'Submit' },
  create: { left: 'Cancel', right: 'Create' }
};

const PromptModal: FC<PromptModalPropesType> = ({
  title,
  onOk,
  onCancel,
  visible,
  text,
  type = 'default',
  closable = true,
  singleButtonType,
  singleButtonClick,
  disabled
}) => {
  const danger = type == 'danger';
  const reject = type == 'reject';

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onOk={onOk}
      closable={closable}
      onCancel={onCancel}
      centered
      width={688}
      footer={null}
      style={{
        border: danger || reject ? '1px solid #EB5757' : '',
        borderRadius: danger || reject ? '7px' : ''
      }}
    >
      <h2
        className={classNames(
          'my-10',
          'font-extrabold',
          'w-4/5',
          'm-auto',
          'text-base',
          'text-center',
          'text-[23px]'
        )}
      >
        {title}
      </h2>
      <div className="my-10 font-bold w-4/5 m-auto text-base text-center pt-8">
        {text}
      </div>
      {singleButtonType ? (
        <div className="w-full m-auto pt-8 my-10 text-center flex justify-center">
          <Button
            type="default"
            color="light-green"
            text={singleButtonType}
            onClick={singleButtonClick}
            size="sm"
          />
        </div>
      ) : (
        <div className="w-2/4 m-auto pt-8 my-10 text-center flex justify-between">
          <Button
            type="default"
            color={
              type !== 'decline' && type !== 'danger' && type !== 'reject'
                ? 'red'
                : 'light-green'
            }
            text={buttons[type].left}
            onClick={onCancel}
            size="sm"
          />
          <Button
            disabled={disabled}
            type="default"
            color={
              type !== 'decline' && type !== 'danger' && type !== 'reject'
                ? 'light-green'
                : 'red'
            }
            text={buttons[type].right}
            onClick={onOk}
            size="sm"
          />
        </div>
      )}
    </Modal>
  );
};
export default PromptModal;
