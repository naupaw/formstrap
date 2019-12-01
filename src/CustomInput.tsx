import { getIn, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import {
  CustomInput as BsCustomInput,
  CustomInputProps,
  FormFeedback,
} from 'reactstrap';

export const CustomInput: React.FC<CustomInputProps> = props => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormikContext();
  const { name } = props;
  const error = getIn(errors, name as string);
  const value = getIn(values, name as string);
  const touch = getIn(touched, name as string);

  let disabled = isSubmitting;

  if (props.disabled) {
    disabled = true;
  }

  const additionalProps = () => {
    const addProps: any = {};
    switch (props.type) {
      case 'checkbox':
        addProps.checked = value == 1 || value === true ? true : false;
        break;
      case 'switch':
        addProps.checked = value == 1 || value === true ? true : false;
        break;
      case 'radio':
        addProps.checked = props.value === value;
        break;
    }

    if (!props.id) {
      addProps.id = props.type + '_' + name;
    }

    return addProps;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (props.type) {
      case 'checkbox':
        setFieldValue(name as never, e.target.checked ? 1 : 0);
        break;
      case 'switch':
        setFieldValue(name as never, e.target.checked ? 1 : 0);
        break;
      default:
        handleChange(e);
        break;
    }
  };

  return (
    <Fragment>
      <BsCustomInput
        {...props}
        {...additionalProps()}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={handleBlur}
        invalid={touch && error}
      />
      {touch && error ? <FormFeedback>{error}</FormFeedback> : ''}
    </Fragment>
  );
};
