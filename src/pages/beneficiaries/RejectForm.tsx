import { useEffect, useState, FC } from 'react';
import ControlledSelect from 'components/ControlledSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { REJECT_REASON } from './constants';
import { RejectFormType, RejectSchema } from './typesAndSchemas';
import ControlledTextarea from 'components/ControlledTextarea/ControlledTextarea';
import { RejectFormPropsType } from './typesAndSchemas';

const RejectForm: FC<RejectFormPropsType> = ({ setRejectReason }) => {
  const [showOther, setShowOther] = useState<boolean>(false);
  const formMethods = useForm<RejectFormType>({
    resolver: yupResolver(RejectSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const { watch, setValue } = formMethods;
  const inputValues = watch();

  useEffect(() => {
    if (inputValues?.rejectReason?.value === 3) {
      setShowOther(true);
      setRejectReason(inputValues.other);
    } else {
      setShowOther(false);
      setRejectReason(inputValues?.rejectReason?.label);
    }
  }, [inputValues]);
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col items-center font-normal text-sm">
        <ControlledSelect
          name="rejectReason"
          label="Rejection reason"
          placeholder="Rejection reason"
          options={REJECT_REASON}
          setValue={setValue}
        />
        {showOther && (
          <ControlledTextarea
            name="other"
            label="Other"
            placeholder="Type a rejection reason"
            wrapperClass="m-auto pt-6"
          />
        )}
      </form>
    </FormProvider>
  );
};

export default RejectForm;
