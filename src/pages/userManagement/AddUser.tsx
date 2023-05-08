import Input from 'components/Input';
import { PhoneValueType } from 'types/general';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'components/Select';
import { Col, Row } from 'antd';
import Button from 'components/Button';
import { USER_TYPES, POSITIONS } from './constants';
import { AddUserSchema, IForm } from './typesAndSchemas';
import { useNavigate } from 'react-router-dom';
import PhoneNumber from 'components/PhoneNumber';

const AddUser = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm<IForm>({
    resolver: yupResolver(AddUserSchema),
    mode: 'onTouched'
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    navigate('/user-management/permissions');
  };
  const setValueAndTrigger = (
    key: any,
    val: { value: string | undefined },
    value: any
  ) => {
    setValue(key, JSON.stringify(value) === JSON.stringify(val) ? null : val, {
      shouldValidate: true
    });
  };

  return (
    <div>
      <p className="text-green mb-7 text-base font-black">Add User</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="flex flex-wrap gap-2 max-w-[908px]">
          <Col>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange }, fieldState: { error } }) => {
                return (
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    onChange={onChange}
                    error={error?.message}
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="surname"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input
                  label="Surname"
                  placeholder="Enter your surname"
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="usertype"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={USER_TYPES}
                    label="User Type"
                    placeholder="Select user type"
                    error={error?.message}
                    value={value}
                    onChange={(val) =>
                      setValueAndTrigger('usertype', val, value)
                    }
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="position"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    onChange={(val) =>
                      setValueAndTrigger('position', val, value)
                    }
                    value={value}
                    placeholder="Select your position"
                    error={error?.message}
                    label="Position in Company"
                    options={POSITIONS}
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value }, fieldState: { error } }) => (
                <PhoneNumber
                  value={value}
                  onChange={(val: PhoneValueType) =>
                    setValue('phoneNumber', val, { shouldValidate: true })
                  }
                  error={error}
                />
              )}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </Col>
        </Row>
        <Row className="mt-8">
          <Col className="flex">
            <Button
              text="Back"
              size="sm"
              className="mr-2"
              type="default"
              color="tea-green"
              textColor="text-black"
              onClick={() => {
                navigate('/user-management');
              }}
            />
            <Button text="Next" size="sm" type="default" submit color="green" />
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AddUser;
