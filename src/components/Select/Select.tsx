import { Typography } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { default as ReactSelect } from 'react-select';
import { SelectTypes } from './types';
import styles from './Select.module.scss';

const { Text } = Typography;

const Select: FC<SelectTypes> = ({
  options,
  label,
  placeholder,
  isClearable = false,
  isMulti = false,
  onChange,
  onBlur,
  error,
  value,
  isSearchable = true,
  formatOptionLabel,
  wrapperClass,
  isValid,
  withLabelMargin = false,
  greenBorder
}) => {
  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: 'unset',
      maxHeight: 36,
      boxShadow: 'none',
      outline: 'none',
      borderColor:
        error || isValid ? '#EB5757 !important' : '#c6c4d4 !important'
    }),

    indicatorsContainer: (base: any) => {
      return {
        padding: '0px !important',
        ...base,
        maxWidth: '32px'
      };
    },
    valueContainer: (base: any) => {
      return {
        ...base,
        paddingRight: '0px !important'
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        ':hover': {
          backgroundColor: '#01e2851c'
        },
        backgroundColor: state.isSelected ? '#16c37b !important' : null
      };
    },
    placeholder: (styles: any) => {
      return {
        ...styles,
        color: '#C6C4D4 !important'
      };
    }
  };
  return (
    <div
      className={
        greenBorder
          ? `${styles.container} ${wrapperClass} ${styles.greenBorder}`
          : `${styles.container} ${wrapperClass}`
      }
    >
      <label
        className={classNames(
          {
            'mt-[21px]': !label && withLabelMargin
          },
          'block text-secondary'
        )}
      >
        {label}
      </label>
      <ReactSelect
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        options={options}
        components={{
          IndicatorSeparator: () => null,
          ClearIndicator: ({ innerProps }: any): JSX.Element => (
            <span
              {...innerProps}
              className="icon-close text-neutral-400 hover:text-neutral-600"
            />
          )
        }}
        styles={{
          ...customStyles
        }}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        formatOptionLabel={formatOptionLabel}
        menuPlacement="auto"
      />
      {error && <Text className="text-error">{`${error}`}</Text>}
    </div>
  );
};

export default Select;
