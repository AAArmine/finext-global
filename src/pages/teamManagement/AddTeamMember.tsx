import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Modal, Row } from 'antd';
import Button from 'components/Button';
import ControlledInput from 'components/ControlledInput';
import ControlledSelect from 'components/ControlledSelect';
import { userRoles } from 'constants/global';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  AddMemberProps,
  AddTeamMemberSchema,
  TeamMembers
} from './typesAndSchemas';

const AddTeamMember: React.FC<AddMemberProps> = ({ visible, onCancel }) => {
  const formMethods = useForm<TeamMembers>({
    resolver: yupResolver(AddTeamMemberSchema),
    mode: 'onTouched',
    defaultValues: {
      teamMembers: [{ email: '', role: { label: '', value: '' } }]
    }
  });
  const { control, setValue, handleSubmit } = formMethods;
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'teamMembers'
  });

  const addMemberRow = () => {
    prepend({ email: '', role: { label: '', value: '' } });
  };

  const handleInvite = (data: any) => {
    console.log(data); // in progress
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      width={1108}
      footer={null}
      bodyStyle={{ height: 600 }}
    >
      <FormProvider {...formMethods}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex items-center flex-col px-48">
            <p className="text-xl text-secondary">Invite a team member</p>
            {fields.map((field, index) => (
              <div className="flex justify-start relative" key={field.id}>
                <Row gutter={20} className="mt-4">
                  <Col span={12}>
                    <ControlledInput
                      control={control}
                      name={`teamMembers.${index}.email`}
                      label="Email"
                      placeholder="Enter the email"
                    />
                  </Col>
                  <Col span={12}>
                    <ControlledSelect
                      control={control}
                      name={`teamMembers.${index}.role`}
                      label="Role"
                      placeholder="Choose user type"
                      options={userRoles}
                      setValue={setValue}
                    />
                  </Col>
                </Row>
                {index !== fields.length - 1 && (
                  <i
                    className="icon-trash text-2xl text-green cursor-pointer absolute bottom-1 right-[-34px]"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            ))}
            <Row className="mt-7 w-full" gutter={20}>
              <Col span={24} className="flex justify-end  px-4">
                <Button
                  type="default"
                  color="light-green"
                  text="+"
                  onClick={addMemberRow}
                  size="xs"
                />
              </Col>
            </Row>
          </div>
          <div className="flex justify-center">
            <Button
              type="default"
              color="light-green"
              text="Invite"
              onClick={handleSubmit(handleInvite)}
              // onClick={onApprove}
              size="sm"
            />
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default AddTeamMember;
