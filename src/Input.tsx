import { getIn, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { FormFeedback, Input as BsInput, InputProps } from 'reactstrap';

export const Input: React.FC<InputProps> = props => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
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

  return (
    <Fragment>
      <BsInput
        {...props}
        disabled={disabled}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        invalid={touch && error}
      />
      {touch && error ? <FormFeedback>{error}</FormFeedback> : ''}
    </Fragment>
  );
};
