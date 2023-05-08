import Input from 'components/Input';
import * as yup from 'yup';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'components/Select';
import { Col, Row } from 'antd';
import Button from 'components/Button';
import { USER_TYPES, POSITIONS, STATUSES } from './constants';
import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import { useNavigate } from 'react-router-dom';
import PhoneNumber from 'components/PhoneNumber';
import { PhoneValueType } from 'types/general';
import { SelectValueType } from 'types/general';

const EditUserSchema = yup.object().shape({
  usertype: yup.object().required(REQUIRED_TEXT),
  position: yup.object().required(REQUIRED_TEXT),
  status: yup.object().required(REQUIRED_TEXT),
  phoneNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT)
});

interface IForm {
  usertype: SelectValueType;
  position: SelectValueType;
  status: SelectValueType;
  phoneNumber: PhoneValueType;
  email: string;
}

const EditUser = () => {
  const navigate = useNavigate();

  const { handleSubmit, control, setValue } = useForm<IForm>({
    resolver: yupResolver(EditUserSchema),
    mode: 'onTouched'
  });
  const onSubmit = (data: FieldValues) => {
    navigate('/user-management/permissions');
    console.log(data);
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
      <p className="text-green mb-7 text-base font-black">
        Edit User Name Surname
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="flex flex-wrap gap-2 max-w-[908px]">
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
          <Col>
            <Controller
              control={control}
              name="status"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={STATUSES}
                    onChange={(val) => setValueAndTrigger('status', val, value)}
                    value={value}
                    placeholder="Select your position"
                    error={error?.message}
                    label="Status"
                    isClearable={false}
                  />
                );
              }}
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

export default EditUser;
