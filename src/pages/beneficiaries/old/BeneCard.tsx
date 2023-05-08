//TODO: delete this old File
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import styles from './Beneficiaries.module.scss';
import { useNavigate } from 'react-router-dom';
import PromptModal from 'components/PromptModal';

type Props = {
  active?: boolean;
  setActive: (active: number) => void;
  setActiveRow: (active: number) => void;
  data: {
    id: number;
  };
  rowIndex: number;
};

const BeneCard: React.FC<Props> = ({
  active = false,
  data,
  setActive,
  rowIndex,
  setActiveRow
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteBeneficiary = () => {
    setIsDeleteModalOpen(false);
  };
  const handleCancelDeleteBeneficiary = () => {
    //ToDo: send id to delete beneficiary
    setIsDeleteModalOpen(false);
  };
  const navigate = useNavigate();
  const openSubCard = () => {
    setActive(data.id);
    setActiveRow(rowIndex);
  };
  return (
    <>
      <div
        className={classNames({
          [styles.cardContainer]: true,
          'px-5 pt-6 cursor-pointer': true,
          'h-60': !active,
          'h-72': active
        })}
        onClick={openSubCard}
      >
        <div className="flex justify-between">
          <span className="text-base font-black text-orange">Yuval Tal</span>
          <div className="gap-2.5 flex">
            <span
              className="icon-send text-green text-xl cursor-pointer"
              onClick={() => navigate('/create-transaction')}
            ></span>
            <span
              className="icon-edit text-green text-xl cursor-pointer"
              onClick={() => navigate('/beneficiaries/edit')}
            ></span>
            <span
              className="icon-trash text-green text-xl cursor-pointer"
              onClick={() => setIsDeleteModalOpen(true)}
            ></span>
          </div>
        </div>
        <Row className="mt-5">
          <Col span={10} className="font-bold text-sm text-secondary">
            Country:
          </Col>
          <Col span={14} className="text-sm text-secondary">
            Israel
          </Col>
        </Row>
        <Row className="mt-2.5">
          <Col span={10} className="font-bold text-sm text-secondary">
            Phone No.:
          </Col>
          <Col span={14} className="text-sm text-secondary">
            +374 00 000 000
          </Col>
        </Row>
        <Row className="mt-2.5">
          <Col span={10} className="font-bold text-sm text-secondary">
            Email:
          </Col>
          <Col span={14} className="text-sm text-secondary">
            example@email.com
          </Col>
        </Row>
        <Row className="mt-2.5">
          <Col span={10} className="font-bold text-sm text-secondary">
            Payment Method:
          </Col>
          <Col span={14} className="text-sm text-secondary flex flex-col gap-1">
            <span>Bank transfer</span>
            <span>Bank transfer</span>
            <span>Bank transfer</span>
          </Col>
        </Row>
      </div>
      <PromptModal
        onOk={handleDeleteBeneficiary}
        onCancel={handleCancelDeleteBeneficiary}
        visible={isDeleteModalOpen}
        text="Are you sure you want to delete 
        Beneficiary2?"
        title="Deleting Beneficiary"
        type="danger"
      />
    </>
  );
};

export default BeneCard;
