import { getIn, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import {
  FormFeedback,
  Input as BsInput,
  InputProps as BsInputProps,
} from 'reactstrap';

export interface InputProps extends BsInputProps {
  withLoading?: boolean;
  withFeedback?: boolean;
}

export const Input: React.FC<InputProps> = props => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
  } = useFormikContext();
  const { name, withFeedback, withLoading } = props;
  const error = getIn(errors, name as string);
  const value = getIn(values, name as string);
  const touch = getIn(touched, name as string);

  let disabled = withLoading ? isSubmitting : false;

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
      {withFeedback && touch && error ? (
        <FormFeedback>{error}</FormFeedback>
      ) : (
        ''
      )}
    </Fragment>
  );
};
Input.defaultProps = {
  withLoading: true,
  withFeedback: true,
};
