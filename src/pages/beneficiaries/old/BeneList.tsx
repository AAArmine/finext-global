//TODO: delete this old File
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import BeneCard from './BeneCard';
import BeneHistory from './BeneHistory';

const data = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  }
];

const BeneList: React.FC = () => {
  const [active, setActive] = useState<number>();
  const [activeRow, setActiveRow] = useState<number>();
  const [beneficiaries, setBeneficiaries] = useState<any>([]);
  useEffect(() => {
    const newData = [...data];
    const benes = [];
    while (newData.length) {
      benes.push(newData.splice(0, 3));
    }
    setBeneficiaries(benes);
  }, [data]);

  return (
    <div className="mt-10">
      {beneficiaries.map((row: any, index: number) => {
        return (
          <>
            <Row gutter={16} key={index} className="mb-5">
              {row.map((item: any, itemIndex: number) => {
                return (
                  <Col span={8} key={itemIndex}>
                    <BeneCard
                      active={active == item.id}
                      rowIndex={index}
                      setActive={setActive}
                      setActiveRow={setActiveRow}
                      data={item}
                    />
                  </Col>
                );
              })}
            </Row>
            {activeRow == index && active && (
              <BeneHistory
                setActiveRow={setActiveRow}
                setActive={setActive}
                data={row[active]}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default BeneList;
